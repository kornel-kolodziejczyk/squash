const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    endDate: { type: Date, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: "Game" }],
    group: { type: String, required: true },
    isRanking: { type: Boolean, required: true },
    league: { type: String, required: true },
    season: { type: String, required: true },
    startDate: { type: Date, required: true },
    table: [{ user: { type: mongoose.Types.ObjectId, ref: "User" }, games: { type: Number }, wins: [{ type: String }], points: { type: Number }, smallPoints: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

groupSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  this.model("Game").deleteMany({ group: this._id }, next);
});

module.exports = mongoose.model("Group", groupSchema);
