import Cart from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        message: "Producto no disponible",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Stock insuficiente",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity > product.stock) {
        return res.status(400).json({
          message: "No hay suficiente stock",
        });
      }
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtTime: product.price,
      });
    }

    await cart.save();

    res.json({
      message: "Producto agregado al carrito",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al agregar al carrito",
    });
  }
};

export const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.productId",
      select: "name price images stock",
    });

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener carrito",
    });
  }
};