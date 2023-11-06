const router = require("express").Router();
const { Clubs, Discussions, Books, Users, Memberships } = require("../models");
const withAuth = require("../utils/auth");

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

const isUserMember = (userId, membership) => {
  for (var i = 0; i < membership.length; i++) {
    if (membership[i].id == userId) {
      return true;
    }
  }
  return false;
};

module.exports = router;
