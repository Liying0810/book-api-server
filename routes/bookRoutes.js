const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create
router.post('/', async (req, res) => {
  console.log("📩 POST /api/books received:", req.body); // 👈 Add this line

  try {
    const book = new Book(req.body);
    await book.save();
    console.log("✅ Book saved:", book); // 👈 Add this line
    res.status(201).json(book);
  } catch (err) {
    console.error("❌ Save error:", err.message); // 👈 Add this line
    res.status(400).json({ message: err.message });
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


