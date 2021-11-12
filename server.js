const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRouter = require("./routes/apiRouter.js");
const htmlRouter = require("./routes/htmlRouter.js");

const PORT = process.env.PORT || 3001;
