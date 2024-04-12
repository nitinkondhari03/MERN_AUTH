import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userroutes from "./routes/user_route.js"
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

app.listen(3000, () => {
  console.log("server run at port 3000");
});

app.use("/api/user",userroutes)
