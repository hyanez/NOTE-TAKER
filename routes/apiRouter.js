const util = require("util");
const router = require("express").Router();
const uuid = require("../helpers/uuid");
const fs = require("fs");
const Notes = require("../db/db.json");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// POST Route for adding notes
router.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      title_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
