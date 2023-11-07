const router = require("express").Router();
const { Clubs, Discussions, Books, Users, Memberships } = require("../models");
const withAuth = require("../utils/auth");
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
      //    res.status(200).json(club);
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

//get a user's id
router.get("/getUserId", (req, res) => {
  if (req.session && req.session.user_id) {
    res.json({ user_id: req.session.user_id });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

//get book list
router.get("/bookListPage", async (req, res) => {
  try {
    console.log("Finding books...");

    const allBooks = await Books.findAll({
      attributes: ["id", "title",],
    });

    const books = allBooks.map((book) => book.get({ plain: true }));

   res.render("bookListPage", {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//go to create book page
router.get("/createBook", (req, res) => {
  if (!req.session.loggedIn) {
    res.render("login");
    return;
  }

  res.render("createBook", {});
});

// update club
router.post("/update-club", async (req, res) => {
  const clubId = req.body.clubId; // You need to send this from the client
  const { clubName, clubDescription, clubType } = req.body;

  // Validate and sanitize the input data here

  try {
    const result = await Clubs.update(
      {
        name: clubName,
        description: clubDescription,
        type: clubType,
      },
      {
        where: { id: clubId },
      }
    );

    if (result[0] > 0) {
      res.json({ message: "Club updated successfully." });
    } else {
      res.status(404).json({ message: "Club not found or no changes made." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update club." });
  }
});

// assign a book to a club
router.post("/assign-book", async (req, res) => {
  const { bookId, clubId } = req.body; // Extract the bookId and clubId from the POST request body
  const userId = req.session.user_id;

  if (!userId) {
    // If the user is not logged in, redirect to the login page or send an error message
    return res
      .status(403)
      .send("You must be logged in to perform this action.");
  }

  try {
    // Find the club by ID where the logged-in user is the admin
    const club = await Clubs.findOne({
      where: {
        id: clubId,
        club_admin_id: userId, // Ensure that the logged-in user is the admin of the club
      },
    });

    if (!club) {
      // If the club is not found or the logged-in user is not the admin, send an error message
      return res
        .status(404)
        .send("Club not found or you are not the admin of this club.");
    }

    // Update the club's current book ID with the new book ID
    await club.update({ current_book_id: bookId });

    // Redirect to a confirmation page, or render a success message
    res.json({ message: "Book successfully assigned to the club." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to assign book to club");
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
      console.log(error);
      res.status(500).send("Error sending invite.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Invite sent successfully!");
    }
  });
});
const isUserMember = (userId, membership) => {
  for (var i = 0; i < membership.length; i++) {
    if (membership[i].id == userId) {
      return true;
    }
  }
  return false;
};

module.exports = router;
