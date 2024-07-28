import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoute.js";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";

dotenv.config();

const port = process.env.PORT || 5000;
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Use morgan middleware for logging in development environment
}
app.use(helmet()); // Use helmet middleware to set security-related HTTP headers
app.use(xss()); // Use xss-clean middleware to sanitize user input and prevent XSS attacks
app.use(hpp()); // Use hpp middleware to protect against HTTP Parameter Pollution attacks

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
