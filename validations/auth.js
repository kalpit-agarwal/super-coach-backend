import { body } from "express-validator";
import helper from "../helpers/helper.js";

const validate = (method) => {
  switch (method) {
    case "registerCoach": {
      return [
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),

        helper.validatorMiddleware,
      ];
    }
    case "registerAthlete": {
      return [
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),
        body("weight").notEmpty().withMessage("Weight is required"),
        body("height").notEmpty().withMessage("Height is required"),
        body("phone").notEmpty().withMessage("Phone number is required"),

        helper.validatorMiddleware,
      ];
    }
    case "loginUser": {
      return [
        body("email").isEmail().withMessage("Invalid email"),
        helper.validatorMiddleware,
      ];
    }
  }
};

export default validate;
