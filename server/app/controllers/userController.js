// controllers/userController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Get single user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user by ID (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('+password');

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.maritalStatus = req.body.maritalStatus || user.maritalStatus;
    user.religion = req.body.religion || user.religion;
    user.caste = req.body.caste || user.caste;
    user.motherTongue = req.body.motherTongue || user.motherTongue;
    user.education = req.body.education || user.education;
    user.occupation = req.body.occupation || user.occupation;
    user.annualIncome = req.body.annualIncome || user.annualIncome;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.complexion = req.body.complexion || user.complexion;
    user.partnerPreferences = req.body.partnerPreferences || user.partnerPreferences;
    user.hobbies = req.body.hobbies || user.hobbies;
    user.bio = req.body.bio || user.bio;
    user.address = req.body.address || user.address;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user by ID (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
