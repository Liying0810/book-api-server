const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('POST error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Read
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


