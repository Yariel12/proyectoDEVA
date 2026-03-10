import mongoose from "mongoose";
import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import InventoryMovement from "../models/InventoryMovement.model.js";
import Address from "../models/address.model.js";
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { address } = req.body;

    let totalAmount = 0;

    const cart = await Cart.findOne({ user: req.user.id }).session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    const addressDoc = await Address.findById(address).session(session);

    if (!addressDoc) {
      throw new Error("Dirección no encontrada");
    }

    if (addressDoc.user.toString() !== req.user.id) {
      throw new Error("Esta dirección no pertenece al usuario.");
    }

    const orderItems = [];

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.productId).session(
        session,
      );

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      if (product.stock < cartItem.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`);
      }

      totalAmount += product.price * cartItem.quantity;

      product.stock -= cartItem.quantity;

      await product.save({ session });

      await InventoryMovement.create(
        [
          {
            product: product._id,
            direction: "out",
            reason: "sale",
            quantity: cartItem.quantity,
            createdBy: req.user.id,
          },
        ],
        { session },
      );

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });
    }

    const order = await Order.create(
      [
        {
          user: req.user.id,
          address,
          items: orderItems,
          totalAmount,
          createdBy: req.user.id,
        },
      ],
      { session },
    );

    cart.items = [];
    await cart.save({ session });

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
      .populate("user", "name email")
      .populate("items.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
    });
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
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
