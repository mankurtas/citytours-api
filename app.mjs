import express from "express";
import cookieParser from "cookie-parser";


const app = express();

// Body parser
app.use(express.json());

//cokie parser
app.use(cookieParser());




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