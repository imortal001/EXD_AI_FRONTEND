const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User created successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set JWT as HTTP-only cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // set to true in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      .status(200)
      .json({
        msg: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

