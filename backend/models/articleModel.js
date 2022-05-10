const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    image: { type: String, required: true },
    text: { type: String, required: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
