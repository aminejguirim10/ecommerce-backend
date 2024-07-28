import express from "express";
import {
  authenticateUser,
  authorizeadmin,
} from "../middleware/authMiddleware.js";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getNewProducts,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(authenticateUser, authorizeadmin, createProduct);
productRouter.route("/:id/reviews").post(authenticateUser, createProductReview);
productRouter.route("/top").get(getTopProducts);
productRouter.route("/new").get(getNewProducts);
productRouter
  .route("/:id")
  .get(getProduct)
  .put(authenticateUser, authorizeadmin, updateProduct)
  .delete(authenticateUser, authorizeadmin, deleteProduct);

export default productRouter;
