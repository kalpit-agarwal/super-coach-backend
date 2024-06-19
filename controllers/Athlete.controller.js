import User from "../models/athleteSchema.js";
import { validationResult } from "express-validator";
import helper from "../helpers/helper.js";
import bcrypt from "bcryptjs";
import response from "../helpers/response.js";
import team from "../models/teamSchema.js";
import mongoose from "mongoose";
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    height,
    weight,
    membershipType,
    membershipStartDate,
  } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }
    const userphone = await User.findOne({ phone });
    if (userphone) {
      return res
        .status(200)
        .json({ success: false, message: "Phone number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: newPassword,
      phone,
      height,
      weight,
      membershipType,
      membershipStartDate,
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
    delete userData.password;
    const auth_token = helper.generateToken(userData);
    return res
      .status(200)
      .json(
        response.responseData(
          "User registered successfully",
          { auth_token, ...userData },
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

const createTeam = async (req, res) => {
  const { teamname, teamtype, coachId, playerId } = req.body;
  const athleteId = req.user._id;

  const teaam = new team({
    teamname,
    teamtype,
    coachId,
    playerId,
    athleteId,
  });
  try {
    await teaam.save();
    res
      .status(200)
      .json(
        response.responseData("Team registered successfully", { teaam }, true)
      );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTeams = async (req, res) => {
  const athleteId = req.user._id;

  try {
    // const teams = await team.find({ athleteId });
    const aggregateData = await team.aggregate([
      {
        $match: {
          athleteId: new mongoose.Types.ObjectId(athleteId),
        },
      },
      {
        $lookup: {
          from: "coaches",
          localField: "coachId",
          foreignField: "_id",
          as: "coach",
        },
      },
      {
        $unwind: {
          path: "$coach",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          coachId: 0,
        },
      },
    ]);

    res
      .status(200)
      .json(response.responseData("Teams fetched", { aggregateData }, true));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  forgotpassword,
  resetpassword,
  createTeam,
  getTeams,
};
