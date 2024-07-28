import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
