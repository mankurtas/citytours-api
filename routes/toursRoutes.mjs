import express from "express";

//Controllers
import { protect } from "../controllers/userController.mjs";

import { getTours, createTour } from "../controllers/toursController.mjs";


const toursRoutes = express.Router();

toursRoutes.route("/view").get(getTours)
toursRoutes.route("/").post(createTour)


export default toursRoutes;