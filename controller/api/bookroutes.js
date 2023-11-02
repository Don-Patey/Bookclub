const express = require('express');
const router = express.Router();
const Books = require('../../models/Books'); // Import the model (Books.js) to use its database functions.

// Create a new book
router.post('/books', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newBook = await Books.create({ name, description });
        res.json(newBook);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create new book' });
    }
});

// Get all books in a list
router.get('/books', async (req, res) => {
    try {
        const allBooks = await Books.findAll();
        res.json(allBooks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
});

// Get book by ID
router.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Books.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(book);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve book' });
    }
});

// Update book by ID
router.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { name, description } = req.body;
    try {
        const updateBook = await Books.update({ name, description }, {
            where: { id: bookId }
        });
        if (updateBook[0] === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json({ message: 'Book updated' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// Delete book by ID
router.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const deleteBook = await Books.destroy({
            where: { id: bookId }
        });
        if (deleteBook === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json({ message: 'Book deleted' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

module.exports = router;
