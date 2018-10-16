require("dotenv").config();

const express = require("express"),
  app = express(),
  { json } = require("body-parser"),
  cors = require("cors"),
  session = require("express-session"),
  { getAllMessages, createMessage, getHistory } = require("./messagesCtrl"),
  port = process.env.PORT || 3005;

app.use(json());
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 10000000
    }
  })
);

app.use((req, res, next) => {
  let badWords = ["knucklehead", "jerk", "internet explorer"];
  if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], "g");
      req.body.message = req.body.message.replace(regex, "****");
      next();
    }
  } else {
    next();
  }
});

app.get("/api/messages", getAllMessages);
app.post("/api/messages", createMessage);

app.get("/api/history", getHistory);

app.listen(port, () => {
  console.log(`Port ${port} is listening...`);
});
