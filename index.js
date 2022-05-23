const express = require("express");

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

const app = express();

app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
