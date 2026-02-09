import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend 999NA online 🚀"
  });
});

app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
