import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

/**
 * ADD TO CART
 */
export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, price: product.price }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        i => i.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price: product.price });
      }
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * GET CART
 */
export const getCart = async (req: any, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * REMOVE ITEM
 */
export const removeCartItem = async (req: any, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      i => i.productId.toString() !== req.params.productId
    );

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * CLEAR CART
 */
export const clearCart = async (req: any, res: Response) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ success: true, message: "Cart cleared" });
};
