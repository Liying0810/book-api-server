const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: '1mb' })); // ⬅️ Add limit in case large payload
app.use(express.urlencoded({ extended: true }));


// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Default route
app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
