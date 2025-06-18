const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // adjust path if needed

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST save book
router.post('/', async (req, res) => {
  console.log('📥 POST /api/books body:', req.body); // ✅ log received data

  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving book:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

