import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.mjs";

const app = express();

// Body parser
app.use(express.json());

//cokie parser
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);


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