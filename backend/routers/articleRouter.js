const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");

// Middlewares
const { fileUpload, isAuth, isAdmin } = require("../middlewares");

// Models
const Article = require("../models/articleModel.js");

// Routers
const articleRouter = express.Router();

articleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pages = await Article.countDocuments();
    const article = await Article.find({}, { image: 1, title: 1, text: 1, date: 1 })
      .sort({ date: -1 })
      .skip(page ? page - 1 : 0)
      .limit(1);

    if (article.length) {
      res.send({ article: article.length ? article[0] : "", page, pages });
    } else {
      res.send("Nie dodano żadnych artykułów");
    }
  })
);

articleRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
      res.send(article);
    } else {
      res.status(404).send({ message: "Nie znaleziono artykułu" });
    }
  })
);

articleRouter.post(
  "/",
  isAuth,
  isAdmin,
  fileUpload.single("image"),
  expressAsyncHandler(async (req, res) => {
    const { title, text, date } = req.body;
    const article = new Article({ title, text, date, image: req.file.path });
    await article.save();
    res.send("Dodano artykuł");
  })
);

articleRouter.put(
  "/",
  fileUpload.single("image"),
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id, title, text, date } = req.body;
    const article = await Article.findById(id);

    if (article) {
      article.title = title || article.title;
      article.text = text || article.text;
      article.date = date || article.date;

      if (req.file) {
        fs.unlink(article.image, (err) => console.log(err));
        article.image = req.file.path;
      }

      await article.save();
      res.send("Zaktualizowano artykuł");
    } else {
      res.status(404).send({ message: `Nie znaleziono artykułu` });
    }
  })
);

articleRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
      await article.delete();
      fs.unlink(article.image, (err) => console.log(err));
      res.send("Usunięto artykuł.");
    } else {
      res.status(404).send({ message: `Nie znaleziono artykułu` });
    }
  })
);

module.exports = articleRouter;
