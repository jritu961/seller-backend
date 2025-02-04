import User from "../model/signup.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export const signInDAta = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }


    // Find user by email
    const user = await User.findOne({email}); // Ensure case-insensitive matching

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch =await bcrypt.compare(password,user.password);
    console.log("isMatch>>>>>>>>>>>>>>>>>>>",isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: 'Signin successful',token });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
