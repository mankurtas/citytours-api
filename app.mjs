import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'


import authRoutes from "./routes/authRoutes.mjs";
import toursRoutes from "./routes/toursRoutes.mjs";

const app = express();

// Body parser
app.use(express.json());

//cors
cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//cokie parser
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tour", toursRoutes);
app.use("/api/v1/tours", toursRoutes);


//centralized errors handler
app.use((err, req, res, next) => {
  const errMessage = err.message || "Internal server Error";
  const statusCode = err.statusCode || 500;
  const errStatus = err.status || "error";

  res.status(statusCode).json({
    status: errStatus,
    message: errMessage,
  });
});

export default app;