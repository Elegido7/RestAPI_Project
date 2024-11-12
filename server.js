// Import required modules
const express = require('express');
require('dotenv').config({ path: './config/api.env' });
const mongoose = require('mongoose');
const User = require('./model/user');

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connection to MongoDB Atlas
console.log(process.env.MONGO_URI);


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Route: GET /users - Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route: POST /users - Add a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: PUT /users/:id - Edit a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route: DELETE /users/:id - Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
