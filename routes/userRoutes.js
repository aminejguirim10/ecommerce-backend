import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userControllers.js";

import {
  authenticateUser,
  authorizeadmin,
} from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(createUser)
  .get(authenticateUser, authorizeadmin, getAllUsers);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, updateUserProfile);
userRouter
  .route("/:id")
  .get(authenticateUser, authorizeadmin, getUser)
  .delete(authenticateUser, authorizeadmin, deleteUser)
  .put(authenticateUser, authorizeadmin, updateUser);
export default userRouter;
