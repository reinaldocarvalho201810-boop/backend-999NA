import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import walletRoutes from "./routes/wallet.routes.js";
dotenv.config();
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/wallet", walletRoutes);
/* =========================
   ROTA RAIZ (teste navegador)
   ========================= */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend 999NA online 🚀"
  });
});

/* =========================
   REGISTRO
   ========================= */
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Dados obrigatórios" });
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }
const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        balance: 0
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Usuário criado",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno" });
  }
});

/* =========================
   LOGIN
   ========================= */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
const user = await prisma.user.findUnique({
  where: { email }
});
    if (!user) {
  return res.status(400).json({ error: "Credenciais inválidas" });
}

const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
  return res.status(400).json({ error: "Credenciais inválidas" });
}
    

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login realizado",
      token
    });

  } catch (err) {
    console.error(err);
    

    
  
    res.status(500).json({ error: "Erro interno" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor online na porta " + PORT);
});
