const express = require('express');
const router = express.Router();
const path = require('../models/Books'); // Import the model (book.js) to use its database functions.  // 

// Create a new book
router.post(`/books`, (req, res) =>{
    try {
        const {name, description} = req.body;
        const newBook = await Books.create({name, description});
        res.json(newBook);
    } catch (err) {
        console.error(err.message);
    }
});

// get all books in a list

router.get(`/books`, (req, res) =>{
    try {
        const allBooks = await Books.findAll();
        res.json(allBooks);
    } catch (err) {
        console.error(err.message);
    }
});

// get book by ID

router.get(`/books/:id`, (req, res) =>{
    try {
        const book = await Books.findByPk(bookId);
        if (!book) {
            res.status(404).json({message: 'Book not found'});
        }
    }
})


module.exports = router;