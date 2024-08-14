import express from "express";
import cros from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./Util/db.js";

dotenv.config({});

const app = express();

//Middle ware -----

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http//localhost:3000",
  credentials: true,
};
app.use(cros(corsOption));

//Home api
//Get
//http//localhost:8080/home

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am just tesing my first Api",
    success: true,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port number -> ${PORT}`);
});
