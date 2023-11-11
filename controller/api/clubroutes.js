const express = require("express");
const router = express.Router();
const  { Clubs } = require("../../models"); // Import the model (Clubs.js) to use its database functions.

// create a new club
router.post("/", async (req, res) => {
  try {
    const { name, description, type } = req.body;
    const newClub = await Clubs.create({
      ...req.body,
      club_admin_id: req.session.user_id,
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
  const updateData = req.body;

  try {
    const updateClub = await Clubs.update(updateData, {
      where: { id: clubId },
    });

    if (updateClub[0] === 0) {
      res.status(404).json({ message: "Club not found" });
    } else {
      res.json({ message: "Club updated", updateData });
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
    res.redirect(`/getClub/${clubId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to assign book to club");
  }
});
module.exports = router;
