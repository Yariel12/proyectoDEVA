import mongoose from "mongoose";
import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import InventoryMovement from "../models/InventoryMovement.model.js";
import Address from "../models/address.model.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { items, address } = req.body;

    let totalAmount = 0;

    const addressDoc = await Address.findById(address).session(session);

    if (!addressDoc) {
      throw new Error("Direccion no encontrada");
    }

    if (addressDoc.user.toString() !== req.user.id) {
      throw new Error("Esta dirección no pertenece al usuario.");
    }

    for (const item of items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      if (product.stock < item.quantity) {
        throw new Error("No stock Suficiente");
      }

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;

      await product.save({ session });

      await InventoryMovement.create(
        [
          {
            product: product._id,
            direction: "out",
            reason: "sale",
            quantity: item.quantity,
            createdBy: req.user.id,
          },
        ],
        { session },
      );

      item.price = product.price;
    }

    const order = await Order.create(
      [
        {
          customer: req.user.id,
          address: address,
          items,
          totalAmount,
          createdBy: req.user.id,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    res.status(201).json(order[0]);
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("items.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
    });
  }
};
