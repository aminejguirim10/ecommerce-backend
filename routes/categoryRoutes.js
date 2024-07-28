import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
import {
  authenticateUser,
  authorizeadmin,
} from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(authenticateUser, authorizeadmin, createCategory);

categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(authenticateUser, authorizeadmin, updateCategory)
  .delete(authenticateUser, authorizeadmin, deleteCategory);

export default categoryRouter;
