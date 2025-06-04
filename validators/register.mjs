import { body } from "express-validator";
import { getUserByUserName } from "../modules/userModules.mjs";

const validateNewUser = [
  // Ensure the request body isn't empty
  body().notEmpty().withMessage("Request body must contain data"),

  // User name validation
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      const user = await getUserByUserName(value);
      if (user) {
        throw new Error("Username already exists");
      }
      return true;
    }),

  //email validation
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  // Password validation
  body("password").notEmpty().withMessage("Password is required"),
];

export default validateNewUser;
