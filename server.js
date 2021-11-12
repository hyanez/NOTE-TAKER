//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRouter = require("./routes/apiRouter.js");
const htmlRouter = require("./routes/htmlRouter.js");

const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Middleware for apiRouter
app.use(apiRouter);
//Middleware for htmlRouter
app.use(htmlRouter);

app.listen(PORT, () =>
  console.log(`Express server listening at http://localhost:${PORT}`)
);
