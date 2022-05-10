const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middlewares
const { isAuth } = require("../middlewares");

// Models
const User = require("../models/userModel.js");

// Routers
const authRouter = express.Router();

// Utils
const { generateToken, sendMail } = require("../utils.js");

authRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({ _id: user._id, name: user.name, email: user.email, phone: user.phone, isAdmin: user.isAdmin, token: generateToken(user, "30d") });
      }
    }
    res.status(401).send({ message: "Niepoprawny e-mail lub hasło" });
  })
);

authRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser, "30d"),
      });
    }
  })
);

authRouter.post(
  "/forget-password",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const resetLink = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "20m" });
      await user.updateOne({ resetLink });
      await sendMail(
        email,
        "Chełmska Liga Squasha. Prośba o zresetowanie hasła",
        `<div style="padding: 20px;">
          <img style="margin-bottom: 10px;max-width:400px" src="${process.env.CLIENT_URL}/static/media/logo.584c0250.png" />
          <h3>Cześć ${user.name}, otrzymaliśmy prośbę o zmianę Twojego aktualnego hasła.</h3>
          <p>Jeżeli chcesz je zmienić, kliknij poniższy przycisk.</p>
          <a style="border:1px solid black;display:inline-block;margin-top:10px;text-decoration:none;padding: 10px;background-color: rgb(228,32,44);color: white;font-weight: 600;" href="${process.env.CLIENT_URL}/reset-password/${resetLink}">Zmień hasło</a>
        </div>`
      );
      res.send("Link do zresetowania hasła został wysłany na podany adres email.");
    } else {
      res.status(404).send({ message: "Użytkownik o podanym adresie email nie istnieje." });
    }
  })
);

authRouter.post(
  "/reset-password",
  expressAsyncHandler(async (req, res) => {
    const { password } = req.body;
    const resetLink = req.headers.authorization.split(" ")[1];
    if (resetLink) {
      await jwt.verify(resetLink, process.env.JWT_SECRET);
      const user = await User.findOne({ resetLink });
      await user.updateOne({ password: bcrypt.hashSync(password, 8), resetLink: "" });
      res.send("Twoje hasło zostało zmienione.");
    } else {
      res.status(401).json({ message: "Niepoprawny link resetujący hasło" });
    }
  })
);

module.exports = authRouter;
