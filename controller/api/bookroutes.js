const express = require("express");
const router = express.Router();
// Import the model (Books.js) to use its database functions.
const { Books, Clubs } = require("../../models"); 


// Create a new book
router.post("/", async (req, res) => {
  try {
    const { name, description, author } = req.body;
    const newBook = await Books.create({ name, description, author });
    res.json(newBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create new book" });
  }
});

// Get all books in a list
router.get("/", async (req, res) => {
  try {
    const allBooks = await Books.findAll();
    res.json(allBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// Get book by ID
router.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const bookData = await Books.findByPk(bookId);
    if (!bookData) {
      res.status(404).json({ message: "Book not found" });
    } else {
      const book = bookData.get({ plain: true });
      let adminClubs = [];

      if (req.session.user_id) {
        const userId = req.session.user_id;
        const clubData = await Clubs.findAll({
          where: {
            club_admin_id: userId,
          },
        });
        adminClubs = clubData.map((club) => club.get({ plain: true }));
      }

      res.render("bookPage", {
        book: book,
        adminClubs: adminClubs,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

// Update book by ID
router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { name, description } = req.body;
  try {
    const updateBook = await Books.update(
      { name, description },
      {
        where: { id: bookId },
      }
    );
    if (updateBook[0] === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json({ message: "Book updated" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete book by ID
router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await Books.destroy({
      where: { id: bookId },
    });
    if (deleteBook === 0) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.json({ message: "Book deleted" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;
