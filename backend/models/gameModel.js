const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    group: { type: mongoose.Types.ObjectId, required: true, ref: "Group" },
    points: [{ type: Number }],
    scores: [{ type: Number }],
    sets: [{ type: Number }],
    unmatched: { type: Boolean },
    users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
    walkowers: [{ type: Boolean }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
