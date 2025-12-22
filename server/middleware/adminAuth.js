import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);

  const token = header.split(" ")[1];

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
}
