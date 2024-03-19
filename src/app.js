const express = require('express');
require('dotenv').config();
const { lookup } = require("dns").promises;
const os = require("os")
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "This is my Kolawole Abiodun" });
  })

app.use((err, req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  })

// Starting the server
const PORT = process.env.PORT || 2300;
app.enable("trust proxy")
app.listen(PORT, async (req, res) => {
    const IP = (await lookup(os.hostname())).address;
    console.log(
      `Server started at ${
        process.env.NODE_ENV === "development" ? "http" : "https"
      }://${IP}:${PORT}`
    );
  });
