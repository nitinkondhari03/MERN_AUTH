import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user_route.js";
import authRoute from "./routes/auth_route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connect To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => {
  console.log("server run at port 3000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
