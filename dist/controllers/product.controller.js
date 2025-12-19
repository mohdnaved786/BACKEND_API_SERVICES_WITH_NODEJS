"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductData = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// CREATE
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ message: "Product created", product });
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// };
const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        // if image uploaded
        if (req.file) {
            productData.image = "/uploads/products/" + req.file.filename;
        }
        const product = await product_model_1.default.create(productData);
        res.status(201).json({ message: "Product created", product });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createProduct = createProduct;
// GET ALL
// export const getProducts = async (req: Request, res: Response) => {
//   const products = await Product.find();
//   res.json(products);
// };
const getProducts = async (req, res) => {
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
        const query = {};
        // Search by product name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        // Filter: Category
        if (category)
            query.category = category;
        // Filter: In Stock (true/false)
        if (inStock)
            query.inStock = inStock === "true";
        // Fetch data
        const products = await product_model_1.default.find(query)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
        // Count total matched products
        const total = await product_model_1.default.countDocuments(query);
        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            products,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getProducts = getProducts;
// GET BY ID
const getProductById = async (req, res) => {
    try {
        const product = await product_model_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch {
        res.status(400).json({ message: "Invalid product ID" });
    }
};
exports.getProductById = getProductById;
const getProductData = async (req, res) => {
    console.log(1);
    try {
        const product = await product_model_1.default.find({
            price: { $gt: 2000 }
        });
        res.json({ message: "Result", product });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getProductData = getProductData;
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
const updateProduct = async (req, res) => {
    try {
        const productData = req.body;
        // If new image uploaded
        if (req.file) {
            productData.image = "/uploads/products/" + req.file.filename;
        }
        const product = await product_model_1.default.findByIdAndUpdate(req.params.id, productData, { new: true });
        res.json({ message: "Product updated", product });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateProduct = updateProduct;
// DELETE
const deleteProduct = async (req, res) => {
    try {
        const result = await product_model_1.default.findByIdAndDelete(req.params.id);
        if (!result)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    }
    catch {
        res.status(400).json({ message: "Invalid product ID" });
    }
};
exports.deleteProduct = deleteProduct;
