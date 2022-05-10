const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
};

exports.fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, uuid() + "." + MIME_TYPE_MAP[file.mimetype]),
  }),
  fileFilter: (req, file, cb) => cb(!!MIME_TYPE_MAP[file.mimetype] ? null : new Error("Nieobsługiwany format pliku!"), !!MIME_TYPE_MAP[file.mimetype]),
});

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || "somethingsecret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Niepoprawny token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Brak tokenu" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Brak uprawnień" });
  }
};
