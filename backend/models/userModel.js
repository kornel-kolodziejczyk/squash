const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    name: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    resetLink: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
