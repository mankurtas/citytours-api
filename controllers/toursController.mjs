import AppError from "../utils/appError.mjs";

import { allTours, insertNewTour } from "../modules/toursModules.mjs";

// get all tours

export const getTours = async (req, res, next) => {
  try {
    const toursList = await allTours();

    if (!toursList || toursList.length === 0) {
      return next(new AppError("Where is no tours.", 404));
    }

    res.status(200).json({
      status: "Success",
      data: toursList,
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to get all tours", 500));
  }
};

//new tour

export const createTour = async (req, res, next) => {
  try {
    const tourData = req.body;

    const insertedTour = await insertNewTour(tourData);

    res.status(200).json({
      status: "Success",
      data: insertedTour,
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to create tour", 500));
  }
};