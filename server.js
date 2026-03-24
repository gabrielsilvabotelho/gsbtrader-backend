const express = require("express");
const cors = require("cors");

const app = express();

// LIBERA TUDO (CORS)
app.use(cors());
app.use(express.json());

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    return res.json({ token: "123" });
  }

  return res.status(401).json({ error: "Login inválido" });
});

// SINAIS (SEM BLOQUEIO)
app.get("/sinais", (req, res) => {
  const sinais = [
    { par: "EUR/USD", sinal: "COMPRA" },
    { par: "GBP/USD", sinal: "VENDA" },
    { par: "USD/JPY", sinal: "COMPRA" }
  ];

  res.json(sinais);
});

// PORTA CORRETA (IMPORTANTE)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
