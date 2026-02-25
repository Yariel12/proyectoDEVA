import ProviderModel from "../models/provider.model.js";
import ProductModel from "../models/product.model.js";

export const createProvider = async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        message: "Nombre,  y teléfono son requeridos",
      });
    }

    const nameExists = await ProviderModel.findOne({ name });
    if (nameExists) {
      return res.status(400).json({
        message: "Ya existe un proveedor con ese nombre",
      });
    }

    const NumberPhoneExists = await ProviderModel.findOne({ phone });
    if (NumberPhoneExists) {
      return res.status(400).json({
        message: "Ya existe un proveedor con ese número de teléfono",
      });
    }

    const provider = await ProviderModel.create({
      name,
      email,
      phone,
      address,
    });

    res.status(201).json({
      message: "Proveedor creado correctamente",
      provider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await ProviderModel.find({ isActive: true });

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await ProviderModel.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const { name, email, phone, address, isActive } = req.body;

    const provider = await ProviderModel.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, isActive },
      { new: true },
    );

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({
      message: "Proveedor actualizado correctamente",
      provider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const provider = await ProviderModel.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const productsUsingProvider = await ProductModel.findOne({
      provider: provider._id,
    });

    if (productsUsingProvider) {
      return res.status(400).json({
        message:
          "No puedes eliminar este proveedor porque tiene productos asociados",
      });
    }

    await provider.deleteOne();

    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
