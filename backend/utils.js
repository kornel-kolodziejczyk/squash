const { generate: generatePassword } = require("generate-password");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD } });
  const mailOptions = { from: process.env.MAIL_USER, to, subject, html };
  await transporter.sendMail(mailOptions);
};

exports.generatePassword = () => {
  const password = generatePassword();
  return bcrypt.hashSync(password, 8);
};

exports.generateToken = (user, time) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: time,
    }
  );
};

exports.createGroupTable = (games) => {
  table = [];

  games.forEach((game) => {
    if (!table.find((row) => row.user.toString() == game.users[0].toString())) {
      table.push({ user: game.users[0], games: 0, wins: [], points: 0, smallPoints: 0 });
    }

    if (!table.find((row) => row.user.toString() == game.users[1].toString())) {
      table.push({ user: game.users[1], games: 0, wins: [], points: 0, smallPoints: 0 });
    }

    const users = [table.find((row) => row.user.toString() == game.users[0].toString()), table.find((row) => row.user.toString() == game.users[1].toString())];

    users[0].points += game.points[0];
    users[1].points += game.points[1];

    users[0].smallPoints += game.sets.slice(0, 5).reduce((total, num) => total + num, 0) - game.sets.slice(5, 10).reduce((total, num) => total + num, 0);
    users[1].smallPoints += game.sets.slice(5, 10).reduce((total, num) => total + num, 0) - game.sets.slice(0, 5).reduce((total, num) => total + num, 0);

    users[0].games += game.points[0] > 0 ? 1 : 0;
    users[1].games += game.points[1] > 0 ? 1 : 0;

    if (game.points[0] > game.points[1]) {
      users[0].wins.push(game.users[1]);
    } else if (game.points[0] < game.points[1]) {
      users[1].wins.push(game.users[0]);
    }
  });

  table.sort((a, b) => {
    if (a.points === b.points) {
      return b.smallPoints - a.smallPoints;
    }
    return b.points - a.points;
  });

  return table;
};
