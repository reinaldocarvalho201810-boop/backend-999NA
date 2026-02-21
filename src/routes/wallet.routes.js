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

export default router;
