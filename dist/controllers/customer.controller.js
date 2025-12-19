"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCustomerStatus = exports.assignAgent = exports.deleteCustomer = exports.updateCustomer = exports.getCustomerById = exports.getAllCustomers = exports.createCustomer = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
// export const createCustomer = async (req: Request, res: Response) => {
//     try {
//         console.log(req.body)
//         const customer = await Customer.create({
//             customerId: "CUST-" + Date.now(),
//             ...req.body,
//             photo: req.file?.filename
//         });
//         res.status(201).json({
//             success: true,
//             message: "Customer created successfully",
//             customer
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", err });
//     }
// };
const createCustomer = async (req, res) => {
    try {
        const customer = await Customer_1.default.create({
            customerId: "CUST-" + Date.now(),
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            country: req.body.country,
            countryCode: req.body.countryCode,
            gender: req.body.gender,
            birthday: req.body.birthday,
            anniversary: req.body.anniversary,
            assignedAgent: req.body.assignedAgent,
            photo: req.file?.filename
        });
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
};
exports.createCustomer = createCustomer;
const getAllCustomers = async (req, res) => {
    const { page = 1, limit = 10, search = "", status } = req.query;
    const filter = {
        name: { $regex: search, $options: "i" }
    };
    if (status !== undefined) {
        filter.status = Number(status);
    }
    const customers = await Customer_1.default.find(filter)
        .populate("assignedAgent", "name agentId")
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit);
    const total = await Customer_1.default.countDocuments(filter);
    res.json({
        success: true,
        total,
        page: Number(page),
        customers
    });
};
exports.getAllCustomers = getAllCustomers;
const getCustomerById = async (req, res) => {
    const customer = await Customer_1.default.findById(req.params.id)
        .populate("assignedAgent", "name agentId");
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ success: true, customer });
};
exports.getCustomerById = getCustomerById;
const updateCustomer = async (req, res) => {
    const customer = await Customer_1.default.findByIdAndUpdate(req.params.id, {
        ...req.body,
        photo: req.file?.filename
    }, { new: true });
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    res.json({
        success: true,
        message: "Customer updated",
        customer
    });
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    await Customer_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: "Customer deleted successfully"
    });
};
exports.deleteCustomer = deleteCustomer;
const assignAgent = async (req, res) => {
    const customer = await Customer_1.default.findByIdAndUpdate(req.params.id, { assignedAgent: req.body.agentId }, { new: true });
    res.json({ success: true, customer });
};
exports.assignAgent = assignAgent;
const changeCustomerStatus = async (req, res) => {
    const customer = await Customer_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, customer });
};
exports.changeCustomerStatus = changeCustomerStatus;
