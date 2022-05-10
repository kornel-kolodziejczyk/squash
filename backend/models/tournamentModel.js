const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    isRanking: { type: Boolean, required: true },
    name: { type: String, required: true },
    pdf: { type: String },
    season: { type: String, required: true },
    table: [{ user: { type: mongoose.Types.ObjectId, ref: "User" }, points: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
