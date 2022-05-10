const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");

// Middlewares
const { fileUpload, isAuth, isAdmin } = require("../middlewares");

// Models
const Tournament = require("../models/tournamentModel");

// Routers
const tournamentRouter = express.Router();

tournamentRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seasons = await Tournament.distinct("season").sort();

    if (seasons.length) {
      const season = req.query.season || seasons[seasons.length - 1];
      const names = await Tournament.find({ season }).distinct("name");
      const name = req.query.name || names[names.length - 1];

      let tournament = await Tournament.findOne({ season, name }, { season: 1, name: 1, table: 1, png: 1 }).populate("table.user", "name").lean();
      res.send({ ...tournament, seasons, names, season, name });
    } else {
      return res.send("Brak danych o rozegranych turniejach.");
    }
  })
);

tournamentRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    let tournament = await Tournament.findById(req.params.id, { season: 1, name: 1, table: 1, png: 1, date: 1, isRanking: 1 }).populate("table.user", "name");

    if (tournament) {
      res.send(tournament);
    } else {
      res.send("Nie znaleziono turnieju.");
    }
  })
);

tournamentRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { season, name, date, isRanking, users } = req.body;

    const tournament = new Tournament({
      season,
      name,
      date,
      isRanking,
      table: users.map((user) => ({ user })),
    });

    await tournament.save();
    res.send("Dodano turniej");
  })
);

tournamentRouter.put(
  "/",
  fileUpload.single("png"),
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id, season, name, date, isRanking, users } = req.body;
    const tournament = await Tournament.findById(id);

    if (tournament) {
      tournament.season = season || tournament.season;
      tournament.name = name || tournament.name;
      tournament.date = date || tournament.date;
      tournament.isRanking = isRanking || tournament.isRanking;
      tournament.table = JSON.parse(users).map((user, index) => ({ user: user.user._id, ...(tournament.isRanking && { points: 100 - 2 * index }) }));

      if (req.file) {
        if (tournament.pdf) {
          fs.unlink(tournament.pdf, (err) => console.log(err));
        }
        tournament.pdf = req.file.path;
      }

      await tournament.save();
      res.send("Zaktualizowano turniej");
    } else {
      res.status(404).send({ message: `Nie znaleziono turnieju` });
    }
  })
);

tournamentRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);

    if (tournament) {
      await tournament.delete();
      res.send("Usunięto turniej.");
    } else {
      res.status(401).send(`Nie znaleziono turnieju`);
    }
  })
);

module.exports = tournamentRouter;
