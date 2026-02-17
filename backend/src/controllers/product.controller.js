import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;
    const nameExists = await ProductModel.findOne({ name });

    if (nameExists) {
      return res.status(400).json({
        message: "El nombre del producto ya existe",
      });
    }

    if (!name || price == null || !category || !images) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }
    if (!images || images.length === 0) {
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

    const product = await ProductModel.create({
      name,
      description,
      price,
      category,
      images,
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
    const products = await ProductModel.find({ isActive: true }).populate(
      "category",
      "name",
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category",
      "name",
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category },
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
