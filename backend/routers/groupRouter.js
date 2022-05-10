const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// Middlewares
const { isAuth, isAdmin } = require("../middlewares");

// Models
const Group = require("../models/groupModel.js");
const Game = require("../models/gameModel.js");

// Routers
const groupRouter = express.Router();

// Utils
const { createGroupTable } = require("../utils");

groupRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seasons = await Group.distinct("season");

    if (seasons.length) {
      let group = await Group.findOne(req.query, { season: 1, league: 1, group: 1, table: 1, games: 1, endDate: 1 })
        .populate({ path: "games", select: "users sets points scores walkowers unmatched", populate: { path: "users", select: "name" } })
        .populate({ path: "table.user", select: "name" })
        .sort({ startDate: -1, group: 1 })
        .lean();

      const leagues = await Group.find({ season: group.season }).distinct("league");
      const groups = await Group.find({ season: group.season, league: group.league }).distinct("group");

      res.send({ ...group, seasons, leagues, groups });
    } else {
      res.send("Nie dodano żadnych grup");
    }
  })
);

groupRouter.get(
  "/games/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id, { sets: 1, points: 1, scores: 1, walkowers: 1, unmatched: 1, group: 1 })
      .populate("users", "name")
      .populate("group", "season league group");
    res.send(game);
  })
);

groupRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { season, league, group, startDate, endDate, isRanking, users } = req.body;

    const games = [];
    const table = [];

    const newGroup = new Group({
      season,
      league,
      group,
      startDate,
      endDate,
      isRanking,
      table: [],
      games: [],
    });

    users.forEach((user1) => {
      table.push({ user: user1._id, games: 0, wins: [], points: 0, smallPoints: 0 });
      users.forEach((user2) => {
        if (user1.name !== user2.name) {
          if (!games.some((game) => game.users[1] === user1._id && game.users[0] === user2._id)) {
            games.push({
              users: [user1._id, user2._id],
              sets: Array(10).fill(null),
              points: Array(2).fill(null),
              scores: Array(2).fill(null),
              walkowers: [false, false],
              group: newGroup,
            });
          }
        }
      });
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    const createdGames = await Game.insertMany(games, { session });

    newGroup.games = [...createdGames.map((game) => game._id)];
    newGroup.table = table;
    await newGroup.save({ session });

    session.commitTransaction();
    res.send("Utworzono grupę");
  })
);

groupRouter.put(
  "/games",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { _id, sets, scores, points, walkowers, unmatched } = req.body.game;

    const game = await Game.findById(_id).populate("group", "table");

    if (req.user.isAdmin || game.users.includes(req.user._id)) {
      game.sets = sets;
      game.scores = scores;
      game.points = points;
      game.walkowers = walkowers;

      game.unmatched = unmatched;

      await game.save();

      const group = await Group.findById(game.group);
      const games = await Game.find({ group: game.group });

      group.table = createGroupTable(games);
      await group.save();

      res.send("Zaktualizowano mecz");
    } else {
      res.status(401).send({ message: "Brak uprawnień" });
    }
  })
);

groupRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (group) {
      await group.deleteOne();
      res.send("Usunięto grupę.");
    } else {
      res.status(401).send(`Nie znaleziono grupy`);
    }
  })
);

module.exports = groupRouter;
