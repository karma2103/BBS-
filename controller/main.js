const express = require("express");
const app = express();
const authController = require("../controller/authController");


app.get("/", authController, (req, res) => {
    res.render("./index.ejs",  { user: req.user })
  })

module.exports =app;
