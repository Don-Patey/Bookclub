const express = require("express");
const router = express.Router();
const Clubs = require("../../models/Clubs"); // Import the model (Clubs.js) to use its database functions.

// create a new club
router.post("/", async (req, res) => {
  try {
    const { name, description, type, club_admin_id, current_book_id } =
      req.body;
    const newClub = await Clubs.create({
      name,
      description,
      type,
      club_admin_id,
      current_book_id,
    });
    res.json(newClub);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create new club" });
  }
});

// Update club by ID
router.put("/:id", async (req, res) => {
  const clubId = req.params.id;
<<<<<<< Updated upstream
  const updateData = req.body;

  try {
    const updateClub = await Clubs.update(updateData, {
      where: { id: clubId },
    });

    if (updateClub[0] === 0) {
      res.status(404).json({ message: "Club not found" });
    } else {
      res.json({ message: "Club updated", updateData });
=======
  const { name, description, type, club_admin_id, current_book_id } = req.body;
  try {
    const updateClub = await Clubs.update(
      { name, description, type, club_admin_id, current_book_id },
      {
        where: { id: clubId },
      }
    );
    if (updateClub[0] === 0) {
      res.status(404).json({ message: "Club not found" });
    } else {
      res.json({ message: "Club updated" });
>>>>>>> Stashed changes
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update club" });
  }
});

// Delete club by ID
router.delete("/:id", async (req, res) => {
  const clubId = req.params.id;
  try {
    const deleteClub = await Clubs.destroy({
      where: { id: clubId },
    });
    if (!deleteClub) {
      res.status(404).json({ message: "Club not found" });
    } else {
      res.json({ message: "Club deleted" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete club" });
  }
});

module.exports = router;
