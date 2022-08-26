import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.js";

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB...");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
