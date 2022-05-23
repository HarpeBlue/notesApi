const express = require("express");
const cors = require("cors");

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [
  {
    id: 1,
    title: "First note",
    body: "This is my first note",
  },
  {
    id: 2,
    title: "Second note",
    body: "This is my second note",
  },
  {
    id: 3,
    title: "Third note",
    body: "This is my third note",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  note ? res.json(note) : res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  res.status(201).json(newNote);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
