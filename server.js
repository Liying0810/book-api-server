const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// 💬 Log ALL incoming POSTs for debugging
app.post('*', (req, res, next) => {
  console.log('📬 Received POST request to:', req.originalUrl);
  console.log('📦 Body:', req.body);
  next();
});

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Default route
app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
