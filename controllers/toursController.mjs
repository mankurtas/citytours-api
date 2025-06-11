import AppError from "../utils/appError.mjs";

import { allTours, insertNewTour, updateTourById } from "../modules/toursModules.mjs";

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
console.log(tourData);

    const insertedTour = await insertNewTour(tourData);

    res.status(200).json({
      status: "Success",
      data: insertedTour,
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to create tour", 500));
  }
};

//updateTour
export const updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const upTour = req.body;

    const updatedTour = await updateTourById(id, upTour);

    if (!updatedTour) {
      return next(new AppError("Tour does not exist, please create it", 404));
    }

    return res.status(200).json({
      status: "success",
      message: "Tour updated",
      data: updatedTour,
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to update tour by ID", 500));
  }
};
