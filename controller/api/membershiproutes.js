const express = require("express");
const router = express.Router();
const { Memberships } = require("../../models");

// Create a new membership
router.post("/", async (req, res) => {
  try {
    const membershipData = await Memberships.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(membershipData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a membership by id
router.delete("/:id", async (req, res) => {
  try {
    const membershipData = await Memberships.destroy({
      where: {
        club_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!membershipData) {
      res.status(404).json({ message: "No membership found with this id!" });
    } else {
      res.status(200).json(membershipData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
