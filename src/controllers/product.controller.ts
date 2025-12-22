import { Request, Response } from "express";
import Product from "../models/Product";

/**
 * CREATE PRODUCT (Admin)
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create({
      ...req.body,
      images: req.files
        ? (req.files as Express.Multer.File[]).map(f => f.filename)
        : []
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * GET ALL PRODUCTS (User)
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const filter: any = { status: 1 };
    if (search) filter.title = { $regex: search, $options: "i" };

    const products = await Product.find(filter)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      total,
      products
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * GET PRODUCT DETAILS
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
