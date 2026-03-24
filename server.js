const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "GSBTRADER_SECRET";

let users = [
  { id: 1, username: "admin", password: "123456", role: "admin" }
];

let sinais = [];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).send("Login inválido");

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
  res.json({ token });
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

app.post("/webhook", (req, res) => {
  sinais.push(req.body);
  res.send("ok");
});

app.get("/sinais", auth, (req, res) => {
  res.json(sinais);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
