import { Request, Response } from "express";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

/**
 * PLACE ORDER
 */
export const placeOrder = async (req: any, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      orderId: "ORD-" + Date.now(),
      userId: req.user.id,
      items: cart.items,
      totalAmount,
      paymentMethod: req.body.paymentMethod
    });

    // reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * USER ORDER HISTORY
 */
export const myOrders = async (req: any, res: Response) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
};

/**
 * ORDER DETAILS
 */
export const orderDetails = async (req: Request, res: Response) => {
  const order = await Order.findOne({ orderId: req.params.id })
    .populate("items.productId");

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({ success: true, order });
};
