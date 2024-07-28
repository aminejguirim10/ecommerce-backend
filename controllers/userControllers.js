import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/createToken.js";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName) {
    return res.status(400).json({ message: "Please enter username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        generateToken(res, user._id);
        return res.status(200).json({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out" });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName) {
    return res.status(400).json({ message: "Please enter username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter email" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      user.userName = userName || user.userName;
      user.email = email || user.email;

      if (password) {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
      }

      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      user.userName = req.body.userName || user.userName;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
