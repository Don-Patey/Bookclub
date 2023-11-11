const router = require("express").Router();
const { Clubs, Discussions, Books, Users, Memberships } = require("../models");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Get all clubs in a list
router.get("/", async (req, res) => {
  try {
    const allClubs = await Clubs.findAll({
      include: [
        {
          model: Books,
        },
        {
          model: Users,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    const clubs = allClubs.map((club) => club.get({ plain: true }));

    res.render("index", {
      clubs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get club by ID
router.get("/getClub/:id", async (req, res) => {
  const clubId = req.params.id;

  try {
    const selectedClub = await Clubs.findByPk(clubId, {
      include: [
        {
          model: Books,
        },
        {
          model: Users,
          attributes: { exclude: ["password"] },
        },
        {
          model: Discussions,
          include: [{ model: Users, attributes: ["name"] }],
        },
        {
          model: Memberships,
          include: [{ model: Users, attributes: ["name"] }],
          attributes: { exclude: ["club_id"] },
        },
      ],
    });

    const club = selectedClub.get({ plain: true });

    if (!club) {
      res.status(404).json({ message: "Club not found" });
    } else {
      const userRole = {
        isAdmin: club.club_admin_id == req.session.user_id,
        isMember: isUserMember(req.session.user_id, club.memberships),
      };

      //  res.status(200).json(club);
      res.render("clubPage", {
        club,
        userRole,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve club" });
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});


//Add a club to the list
router.get("/addClub", (req, res) => {
  if (req.session.loggedIn) {
    res.render("addClub", {
      loggedIn: req.session.loggedIn,
    });
    return;
  }
  res.redirect("/");
});


// Add a book to the library
router.get('/createBook', (req, res) => {
  if (req.session.loggedIn) {
    res.render("createBook", {
      loggedIn: req.session.loggedIn,
    });
    return;
  }
  res.redirect("/");
});

//get book list
router.get("/bookListPage", async (req, res) => {
  try {
    console.log("Finding books...");

    const allBooks = await Books.findAll({});

    const books = allBooks.map((book) => book.get({ plain: true }));

    console.log("books: ", books);

    res.render("bookListPage", {
      books,
      loggedIn: req.session.loggedin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_EMAIL_PASSWORD,
  },
});

//send invite email
router.post("/send-invites", (req, res) => {
  const { friendEmail } = req.body;
  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: friendEmail,
    subject: "You are invited!",
    text: "You have been invited to join our book club!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("Error sending invite.");
    } else {
      res.status(200).send("Invite sent successfully!");
    }
  });
});

// check to see if the user is am member of the club
const isUserMember = (userId, membership) => {
  for (var i = 0; i < membership.length; i++) {
  
    if (membership[i].user_id == userId) {
      return true;
    }
  }
  return false;
};

module.exports = router;
