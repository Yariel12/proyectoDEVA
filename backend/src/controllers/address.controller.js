import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
  try {
    const { street, city, province, phone } = req.body;

    if (!street || !city || !province || !phone) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const address = await Address.create({
      user: req.user.id,
      street,
      city,
      province,
      phone,
    });

    res.status(201).json({
      message: "Dirección creada correctamente",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear la dirección",
    });
  }
};

export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user.id,
    });

    res.json(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las direcciones",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { street, city, province, phone } = req.body;

    if (!street || !city || !province || !phone) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        street,
        city,
        province,
        phone,
      },
      { new: true },
    );

    if (!address) {
      return res.status(404).json({
        message: "Dirección no encontrada",
      });
    }

    res.json({
      message: "Dirección actualizada",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar la dirección",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!address) {
      return res.status(404).json({
        message: "Dirección no encontrada",
      });
    }

    res.json({
      message: "Dirección eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar la dirección",
    });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!address) {
      return res.status(404).json({
        message: "Dirección no encontrada",
      });
    }

    await Address.updateMany({ user: req.user.id }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    res.json({
      message: "Dirección predeterminada actualizada",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar la dirección predeterminada",
    });
  }
};
