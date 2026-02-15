import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // pegar header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // salvar usuário dentro da requisição
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
