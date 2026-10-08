const User = require('../models/User');
const { hashPassword } = require('../utils/password');
const { comparePassword } = require('../utils/password');
const jwt = require('jsonwebtoken');
const { sendSuccess } = require('../utils/apiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'name, email and password are required');
  }
  if (typeof password !== 'string' || password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters');
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new ApiError(409, 'Email already registered');
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email: normalizedEmail, passwordHash });

  return sendSuccess(
    res,
    { id: user._id, name: user.name, email: user.email, role: user.role },
    201
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'email and password are required');
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return sendSuccess(res, {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

module.exports = { register, login };