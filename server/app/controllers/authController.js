// controllers/authController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    maritalStatus,
    religion,
    caste,
    motherTongue,
    education,
    occupation,
    annualIncome,
    height,
    weight,
    complexion,
    partnerPreferences,
    hobbies,
    bio,
  } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    maritalStatus,
    religion,
    caste,
    motherTongue,
    education,
    occupation,
    annualIncome,
    height,
    weight,
    complexion,
    partnerPreferences,
    hobbies,
    bio,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');

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

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
};
