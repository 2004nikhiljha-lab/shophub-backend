const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    inStock: { type: Boolean, default: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
