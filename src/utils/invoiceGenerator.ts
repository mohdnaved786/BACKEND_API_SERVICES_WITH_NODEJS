import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = async (order: any, user: any) => {
  const invoiceDir = path.join(__dirname, "../../uploads/invoices");
  if (!fs.existsSync(invoiceDir)) fs.mkdirSync(invoiceDir, { recursive: true });

  const fileName = `invoice-${order.orderId}.pdf`;
  const filePath = path.join(invoiceDir, fileName);

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  // 🏷️ HEADER
  doc.fontSize(20).text("INVOICE", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Order ID: ${order.orderId}`);
  doc.text(`Order Date: ${new Date(order.createdAt).toDateString()}`);
  doc.moveDown();

  // 👤 CUSTOMER DETAILS
  doc.fontSize(14).text("Customer Details", { underline: true });
  doc.fontSize(12).text(`Name: ${user.userName}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Mobile: ${user.mobile}`);
  doc.moveDown();

  // 📦 ORDER ITEMS
  doc.fontSize(14).text("Order Items", { underline: true });
  doc.moveDown(0.5);

  order.items.forEach((item: any, index: number) => {
    doc.fontSize(12).text(
      `${index + 1}. ${item.productId.name} | Qty: ${item.quantity} | Price: ₹${item.price}`
    );
  });

  doc.moveDown();

  // 💰 TOTAL
  doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, {
    align: "right",
  });

  doc.moveDown();

  // 📝 FOOTER
  doc.fontSize(10).text(
    "Thank you for shopping with us!",
    { align: "center" }
  );

  doc.end();

  return {
    fileName,
    filePath,
  };
};
