import mongoose from "mongoose";

const inventoryMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    direction: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },

    reason: {
      type: String,
      enum: ["purchase", "sale", "adjustment", "damage", "return"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    note: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("InventoryMovement", inventoryMovementSchema);
