import User from "../models/coachSchema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import response from "../helpers/response.js";

import helper from "../helpers/helper.js";

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, experience, salary } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: newPassword,
      experience,
      salary,
    });

    const auth_token = helper.generateToken(userData);

    return res
      .status(201)
      .json(
        response.responseData(
          "User registered successfully",
          { auth_token, userData },
          true
        )
      );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(response.responseData(err.message, {}, false));
  }
};
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userData = user.toJSON();
    const auth_token = helper.generateToken(userData);
    return res
      .status(200)
      .json(
        response.responseData(
          "User registered successfully",
          { auth_token, userData },
          true
        )
      );
  } catch {
    return res.status(500).json(response.responseData(err.message, {}, false));
  }
};
const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await Athlete.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    res
      .status(200)
      .json({ message: "Password reset link sent to your email address" });
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:4001/reset-password/${token}`;
    await helper.dynamicMailer("Kalpit", email, resetLink);
    console.log(token);
    // return res.status(200).json({ message: "Password reset link sent" });
  } catch (err) {
    console.log(err);
  }
};

const resetpassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Athlete.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Athlete.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
  }
};

const getCoach = async (req, res) => {
  const allcoach = await User.find();
  return res
    .status(200)
    .json(
      response.responseData(
        "All coaches fetched successfully",
        { allcoach },
        true
      )
    );
};

export { registerUser, loginUser, forgotpassword, resetpassword, getCoach };
