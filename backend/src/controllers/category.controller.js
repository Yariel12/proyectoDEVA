import Category from "../models/category.model.js";
import ProductModel from "../models/product.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "El nombre y la descripción son requeridos",
      });
    }

    const normalizedName = name.trim().toLowerCase();

    const categoryExists = await Category.findOne({
      name: normalizedName,
    });

    if (categoryExists) {
      return res.status(400).json({
        message: "La categoría ya existe",
      });
    }

    const category = await Category.create({
      name: normalizedName,
      description: description.trim(),
    });

    res.status(201).json({
      message: "Categoría creada correctamente",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category || !category.isActive) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    if (name) {
      const normalizedName = name.trim().toLowerCase();

      const categoryExists = await Category.findOne({
        name: normalizedName,
        _id: { $ne: req.params.id },
      });

      if (categoryExists) {
        return res.status(400).json({
          message: "Ya existe una categoría con ese nombre",
        });
      }

      category.name = normalizedName;
    }

    if (description) {
      category.description = description.trim();
    }

    await category.save();

    res.json({
      message: "Categoría actualizada correctamente",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const desactivateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.json({
      message: "Categoría desactivada correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const products = await ProductModel.countDocuments({
      category: categoryId,
      isActive: true,
    });

    if (products > 0) {
      return res.status(400).json({
        message:
          "No se puede eliminar la categoría porque tiene productos asociados",
      });
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.json({
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
