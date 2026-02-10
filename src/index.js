import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "segredo_999NA";

// rota status
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend 999NA online 🚀"
  });
});

// cadastro
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    message: "Usuário criado com sucesso",
    token
  });
});

// login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    message: "Login realizado",
    token
  });
});

// rota protegida
app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token ausente" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

// webhook (mantido)
app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.json({ received: true });
});

// SEMPRE POR ÚLTIMO
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
