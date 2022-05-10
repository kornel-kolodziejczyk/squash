const { generate: generatePassword } = require("generate-password");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middlewares
const { isAuth, isAdmin } = require("../middlewares");

// Models
const User = require("../models/userModel.js");
const Group = require("../models/groupModel.js");

// Routers
const userRouter = express.Router();

// Utils
const { sendMail } = require("../utils.js");

userRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
      const users = await User.find({}, { name: 1, email: 1, phone: 1 }).collation({ locale: "en_US" }).sort({ name: 1 });
      res.send(users);
    } else {
      const activeUsers = await Group.find({ endDate: { $gt: new Date() } }).distinct("table.user");
      const users = await User.find({ _id: { $in: activeUsers } }, { name: 1, phone: 1 })
        .collation({ locale: "en_US" })
        .sort({ name: 1 });

      res.send(users);
    }
  })
);

userRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id, { name: 1, phone: 1, email: 1 });
    res.send(user);
  })
);

userRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        res.send("Istnieje użytkownik przypisany do tego adresu e-mail");
      } else {
        const user = new User({
          name,
          email,
          phone,
          password: generatePassword(),
        });

        user.resetLink = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        await user.save();
        await sendMail(
          email,
          "Witaj w Chełmskiej Lidze Squasha!",
          `<div style="padding: 20px;">
            <img style="margin-bottom: 10px;max-width:400px" src="${process.env.CLIENT_URL}/static/media/logo.584c0250.png" />
            <h3>Cześć ${user.name}, bardzo się cieszymy, że do nas dołączyłeś/aś!</h3>
            <p>Kliknij poniższy przycisk, aby dokończyć rejestrację i ustawić hasło do swojego konta.</p>
            <a style="border:1px solid black;display:inline-block;margin-top:10px;text-decoration:none;padding: 10px;background-color: rgb(228,32,44);color: white;font-weight: 600;" href="${process.env.CLIENT_URL}/reset-password/${user.resetLink}">Ustaw hasło</a>
          </div>`
        );
        res.send("Utworzono użytkownika");
      }
    } else {
      const user = new User({ name });
      await user.save();
      res.send("Utworzono użytkownika");
    }
  })
);

userRouter.put(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id, email, phone } = req.body;
    await User.findOneAndUpdate({ _id: id }, { email, phone });
    res.send("Zaktualizowano użytkownika");
  })
);

module.exports = userRouter;
