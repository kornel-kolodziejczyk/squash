const bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      name: "Kornel Kołodziejczyk",
      email: "chelmskaligasquasha.repo@gmail.com",
      password: bcrypt.hashSync("password", 8),
      isAdmin: true,
    },
  ],
};

module.exports = data;
