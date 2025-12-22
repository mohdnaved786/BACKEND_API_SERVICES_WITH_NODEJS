import { Request, Response } from "express";
import Order from "../models/Order";

/**
 * ALL ORDERS (Admin)
 */
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find()
    .populate("userId")
    .sort({ createdAt: -1 });

  res.json({ success: true, orders });
};

/**
 * UPDATE ORDER STATUS
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.orderStatus },
    { new: true }
  );

  res.json({ success: true, order });
};
