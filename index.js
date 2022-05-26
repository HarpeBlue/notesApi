require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");
const Note = require("./models/Note");
const { response } = require("express");

const logger = async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      note
        ? res.json(note)
        : res.status(404).json({ message: "Not found" }).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  const newNote = new Note({
    content: note.content,
    date: new Date().toISOString(),
    important: note.important || false,
  });

  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use((err, req, res) => {
  console.error(err);
  if (err.name === "CastError") {
    res.status(400).end();
  } else {
    response.status(500).end();
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found route" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
