const express = require("express");
const expressAsyncHandler = require("express-async-handler");

// Models
const Group = require("../models/groupModel");
const Tournament = require("../models/tournamentModel");

// Routers
const rankingRouter = express.Router();

rankingRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seasons = [
      ...new Set([...(await Group.find({ isRanking: true }).distinct("season")), ...(await Tournament.find({ isRanking: true, png: { $exists: true } }).distinct("season"))]),
    ].sort();

    if (seasons.length) {
      const season = req.query.season || seasons[seasons.length - 1];
      const groups = await Group.find({ season, isRanking: true }, { league: 1, table: 1, endDate: 1 }).populate("table.user", "name");
      const tournaments = await Tournament.find({ season, isRanking: true, png: { $exists: true } }, { table: 1 }).populate("table.user", "name");

      const ranking = {};
      const sortedGroups = {};

      groups.forEach((group) => {
        if (!sortedGroups[group.league]) {
          sortedGroups[group.league] = [];
        }
        sortedGroups[group.league].push(...group.table);
        sortedGroups[group.league].forEach((user) => (user.finished = group.endDate < new Date() ? true : false));
      });

      Object.values(sortedGroups).forEach((round) => {
        round.forEach((user, index) => {
          if (!ranking[user.user._id]) {
            ranking[user.user._id] = {
              _id: user.user._id,
              name: user.user.name,
              groupPoints: user.points + (user.finished ? 100 - index * 2 : 0),
              tournamentPoints: 0,
              points: user.points + (user.finished ? 100 - index * 2 : 0),
            };
          } else {
            ranking[user.user._id].groupPoints += user.points + (user.finished ? 100 - index * 2 : 0);
            ranking[user.user._id].points += user.points + (user.finished ? 100 - index * 2 : 0);
          }
        });
      });

      tournaments.forEach((tournament) => {
        tournament.table.forEach((user) => {
          if (user.user) {
            if (!ranking[user.user._id]) {
              ranking[user.user._id] = { _id: user.user._id, name: user.user.name, groupPoints: 0, tournamentPoints: user.points, points: user.points };
            } else {
              ranking[user.user._id].tournamentPoints += user.points;
              ranking[user.user._id].points += user.points;
            }
          }
        });
      });

      const users = Object.fromEntries(Object.entries(ranking).sort(([, a], [, b]) => b.points - a.points));

      res.send({ seasons, season, users });
    } else {
      res.send("Nie rozegrano żadnych meczów");
    }
  })
);

module.exports = rankingRouter;
