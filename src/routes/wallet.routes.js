import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* =========================
   MIDDLEWARE AUTH
========================= */
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token não enviado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

/* =========================
   GET BALANCE
========================= */
router.get("/balance", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  res.json({ balance: user.balance });
});
/* =========================
   DEPOSIT
========================= */

router.post("/deposit", auth, async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Valor inválido" });
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      balance: {
        increment: amount
      }
    }
  });

  await prisma.transaction.create({
    data: {
      type: "deposit",
      amount: amount,
      userId: req.user.id
    }
  });

  res.json({
    message: "Depósito realizado",
    balance: user.balance
  });
});
/* =========================
   WITHDRAW
========================= */

router.post("/withdraw", auth, async (req, res) => {
  const { amount } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  if (user.balance < amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      balance: {
        decrement: amount
      }
    }
  });

  await prisma.transaction.create({
    data: {
      type: "withdraw",
      amount: amount,
      userId: req.user.id
    }
  });

  res.json({
    message: "Saque realizado",
    balance: updatedUser.balance
  });
});
export default router;
