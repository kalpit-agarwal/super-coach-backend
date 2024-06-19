import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
const helper = {
  generateToken: (userData) => {
    const data = {
      user: {
        _id: userData._id,
      },
    };

    return jwt.sign(data, process.env.JWT_SECRET);
  },
  validatorMiddleware: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  },
  dynamicMailer: async (name, email, text) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "garnet80@ethereal.email",
        pass: "7tZC97BNJZ6tC2ZxKm",
      },
    });
    const info = await transporter.sendMail({
      from: `${name} <${email}>`, // sender address
      to: "kalpitagarwal12345@gmail.com", // list of receivers
      subject: "Hello buddy", // Subject line
      text: text, // plain text body
      html: `<b>${text}</b>`, // html body
    });

    return info.messageId;
  },
};

export default helper;
