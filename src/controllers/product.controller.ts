import { Request, Response } from "express";
import Product from "../models/product.model";

// CREATE
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ message: "Product created", product });
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// };

export const createProduct = async (req: any, res: Response) => {
  try {
    const productData = req.body;

    // if image uploaded
    if (req.file) {
      productData.image = "/uploads/products/" + req.file.filename;
    }

    const product = await Product.create(productData);
    res.status(201).json({ message: "Product created", product });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


// GET ALL
// export const getProducts = async (req: Request, res: Response) => {
//   const products = await Product.find();
//   res.json(products);
// };

export const getProducts = async (req: Request, res: Response) => {
  try {
    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // SEARCH
    const search = req.query.search?.toString() || "";

    // FILTERS
    const category = req.query.category?.toString() || "";
    const inStock = req.query.inStock?.toString() || "";

    // SORTING
    const sortField = req.query.sortField?.toString() || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // QUERY OBJECT
    const query: any = {};

    // Search by product name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter: Category
    if (category) query.category = category;

    // Filter: In Stock (true/false)
    if (inStock) query.inStock = inStock === "true";

    // Fetch data
    const products = await Product.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    // Count total matched products
    const total = await Product.countDocuments(query);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products,
    });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


// GET BY ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

// UPDATE
// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product updated", product });
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// };


export const updateProduct = async (req: any, res: Response) => {
  try {
    const productData = req.body;

    // If new image uploaded
    if (req.file) {
      productData.image = "/uploads/products/" + req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    res.json({ message: "Product updated", product });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
