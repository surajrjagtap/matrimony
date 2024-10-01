// routes/users.js

const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');
// You may need to implement an admin middleware if certain routes are admin-only

// Example: const { admin } = require('../middleware/adminMiddleware');

// @route   GET /api/users
router.get('/', getUsers);

// @route   GET /api/users/:id
router.get('/:id', getUserById);

// @route   PUT /api/users/:id
router.put('/:id', updateUser);

// @route   DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
