import express from "express";

//Controllers
import { register, login, protect, getAuthenticatedUser } from "../controllers/userController.mjs";

// Validators
import validate from "../validators/validate.mjs";
import validateNewUser from "../validators/register.mjs";
import validateLogin from "../validators/login.mjs";

const authRoutes = express.Router();

authRoutes.route("/register").post( validateNewUser,  validate, register);
authRoutes.route("/login").post(validateLogin, validate, login);

authRoutes.route("/me").get(protect, getAuthenticatedUser);


export default authRoutes;

