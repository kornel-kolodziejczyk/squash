const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

const articleRouter = require("./routers/articleRouter.js");
const authRouter = require("./routers/authRouter.js");
const groupRouter = require("./routers/groupRouter.js");
const rankingRouter = require("./routers/rankingRouter.js");
const tournamentRouter = require("./routers/tournamentRouter.js");
const userRouter = require("./routers/userRouter.js");

// Data
const data = require("./data");

// Models
const User = require("./models/userModel");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  async () => {
    const users = await User.countDocuments();
    if (!users) {
      console.log("No users. Creating admin user.");
      await User.insertMany(data.users);
    }
  }
);

app.use("/api", authRouter);
app.use("/api/articles", articleRouter);
app.use("/api/groups", groupRouter);
app.use("/api/rankings", rankingRouter);
app.use("/api/tournaments", tournamentRouter);
app.use("/api/users", userRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => res.send("Server is ready"));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
  console.log(error);
  res.status(500).send({ message: error.message });
});

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const port = process.env.port || 5000;

app.listen(port, async () => console.log(`Serve at port ${port}`));
