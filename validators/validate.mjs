import { validationResult } from "express-validator";
import AppError from "../utils/appError.mjs";

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Create error string
      const errorString = errors
        .array()
        .map((error) => error.msg)
        .join("; ");
      throw new AppError(errorString, 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
