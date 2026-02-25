import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import ProviderModel from "../models/Provider.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, provider } = req.body;

    const nameExists = await ProductModel.findOne({ name });
    if (nameExists) {
      return res.status(400).json({
        message: "El nombre del producto ya existe",
      });
    }

    if (!name || price == null || !category || !images || !provider) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }

    if (images.length === 0) {
      return res.status(400).json({
        message: "Debe agregar al menos una imagen",
      });
    }

    if (!images.every((img) => img.startsWith("http"))) {
      return res.status(400).json({
        message: "Todas las imágenes deben ser URLs válidas",
      });
    }

    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "La categoría no existe" });
    }

    const providerExists = await ProviderModel.findById(provider);
    if (!providerExists) {
      return res.status(400).json({ message: "El proveedor no existe" });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      category,
      images,
      provider,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Producto creado correctamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      provider,
      status,
    } = req.query;

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (provider) {
      query.provider = provider;
    }

    if (status) {
      query.isActive = status === "active";
    } else {
      query.isActive = true;
    }

    const total = await ProductModel.countDocuments(query);

    const products = await ProductModel.find(query)
      .populate("category", "name")
      .populate("provider", "name email")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("category", "name")
      .populate("provider", "name email phone");

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, provider } = req.body;

    if (provider) {
      const providerExists = await ProviderModel.findById(provider);
      if (!providerExists) {
        return res.status(400).json({ message: "El proveedor no existe" });
      }
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, provider },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
