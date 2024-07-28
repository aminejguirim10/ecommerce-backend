import Product from "../models/productModel.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, brand, description, quantity, price, category } =
    req.body;
  if (!name) {
    return res.status(400).json({ message: "Please enter product name" });
  }
  if (!image) {
    return res.status(400).json({ message: "Please enter product image" });
  }
  if (!brand) {
    return res.status(400).json({ message: "Please enter product brand" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: "Please enter product description" });
  }
  if (!quantity) {
    return res.status(400).json({ message: "Please enter product quantity" });
  }
  if (!price) {
    return res.status(400).json({ message: "Please enter product price" });
  }
  if (!category) {
    return res.status(400).json({ message: "Please enter product category" });
  }
  try {
    const product = await Product.create({
      name,
      image,
      brand,
      description,
      quantity,
      price,
      category,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, image, brand, description, quantity, price, category } =
    req.body;
  if (
    !name ||
    !image ||
    !brand ||
    !description ||
    !quantity ||
    !price ||
    !category
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        brand,
        description,
        quantity,
        price,
        category,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
          return res.status(400).json({ message: "Product already reviewed" });
        }
        const review = {
          name: req.user.userName,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review added" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(3);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(3);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
