const express = require("express");
const morgan = require("morgan");

const app = express();
morgan.token("obtj", (req) => JSON.stringify(req.body));

app.use(
  express.json(),
  morgan(":method :url :status :res[content-length] - :response-time ms :obtj")
);
const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
];

app.get("/api/persons", function (req, res) {
  return res.status(200).json(persons);
});
app.get("/info", function (req, res) {
  return res
    .status(200)
    .send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`);
});

app.get("/api/persons/:id", function (req, res) {
  if (req.params.id === undefined) {
    return res.status(400).json({ error: "id missing" });
  }
  return res
    .status(200)
    .json(persons.find((person) => person.id === Number(req.params.id)));
});
app.delete("/api/persons/:id", function (req, res) {
  if (req.params.id === undefined) {
    return res.status(400).json({ error: "id missing" });
  }
  const id = Number(req.params.id);
  let person = persons.filter((person) => person.id !== id);

  return res
    .status(200)
    .json({ success: true, message: "telephone removed", ...person });
});

app.post("/api/persons", function (req, res) {
  if (req.body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (req.body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }

  const id = Math.floor(Math.random() * 100000);
  const person = {
    id: id,
    name: req.body.name,
    number: req.body.number,
  };

  persons.push(person);
  return res.status(200).json({ success: true, ...person });
});
app.listen(4000);
