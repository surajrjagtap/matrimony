// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Exclude password from query results by default
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        'Please add a valid phone number',
      ],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    // Address Details
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    // Matrimonial Details
    maritalStatus: {
      type: String,
      enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
      required: [true, 'Marital status is required'],
    },
    religion: {
      type: String,
      required: [true, 'Religion is required'],
    },
    caste: {
      type: String,
      required: [true, 'Caste is required'],
    },
    motherTongue: {
      type: String,
      required: [true, 'Mother tongue is required'],
    },
    education: {
      highestDegree: { type: String, required: true },
      fieldOfStudy: { type: String },
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
    },
    annualIncome: {
      type: Number,
      required: [true, 'Annual income is required'],
    },
    height: {
      type: Number, // Height in centimeters
      required: [true, 'Height is required'],
    },
    weight: {
      type: Number, // Weight in kilograms
    },
    complexion: {
      type: String,
      enum: ['Fair', 'Wheatish', 'Dark', 'Other'],
    },
    // Preferences
    partnerPreferences: {
      ageRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      },
      heightRange: {
        min: { type: Number },
        max: { type: Number },
      },
      maritalStatus: [
        {
          type: String,
          enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
        },
      ],
      religion: [String],
      caste: [String],
      education: [String],
      occupation: [String],
      location: {
        city: [String],
        state: [String],
        country: [String],
      },
    },
    // Additional Information
    hobbies: [String],
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    profilePicture: {
      type: String, // URL to the image
    },
    // Email Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    // Phone Verification
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerificationToken: String,
    phoneVerificationExpires: Date,
  },
  { timestamps: true }
);

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
