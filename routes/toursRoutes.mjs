import express from "express";

//Controllers
import { protect, restrictTo } from "../controllers/userController.mjs";

import { getTours, createTour, updateTour } from "../controllers/toursController.mjs";


const toursRoutes = express.Router();

//Tours
toursRoutes.route("/view").get(getTours)
toursRoutes.route("/").post(protect, restrictTo("admin"), createTour)

//Tour
toursRoutes.route("/:id").patch(protect, restrictTo("admin"), updateTour)

export default toursRoutes;