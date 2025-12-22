import { Request, Response } from "express";
import Order from "../models/Order";
import User from "../models/User";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findById(order.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const invoice = await generateInvoicePDF(order, user);

    res.json({
      success: true,
      message: "Invoice generated successfully",
      invoiceUrl: `/uploads/invoices/${invoice.fileName}`
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
