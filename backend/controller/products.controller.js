import Product from "../models/product.model.js";
import mongoose from "mongoose";

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function addProduct(req, res) {
  const products = req.body;

  if (!products.name || !products.price || !products.image || !products.description) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all valid and complete fields" });
  }

  const newProduct = new Product(products);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteProduct(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Invalid Product Id" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function updateProduct(req, res) {
  const id = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ status: false, message: "Invalid Product Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
