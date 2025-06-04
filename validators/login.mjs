import { body } from "express-validator";
import argon2 from "argon2";
import { getUserByUserName } from "../modules/userModules.mjs";

const validateLogin = [
  // Username validation
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (value) => {
      const user = await getUserByUserName(value);
      if (!user) {
        throw new Error("User not found, please sign up");
      }
      return true;
    }),

  // Password validation with async check
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const user = await getUserByUserName(req.body.username);
      if (user) {
        const matchPass = await argon2.verify(user.password, value);
        if (!matchPass) {
          throw new Error("Password is incorrect");
        }
        return true;
      }
    }),
];

export default validateLogin;
