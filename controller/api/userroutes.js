const router = require("express").Router();
const { Users } = require("../../models");

// create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await Users.create(req.body);

    req.session.save(() => {
      (req.session.user_id = userData.id), (req.session.loggedIn = true);
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.destroy();
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
