export default function adminAuth(req, res, next) {
  const token = req.headers["x-admin-token"];

  if (!token) {
    return res.status(401).json({ error: "ADMIN TOKEN MISSING" });
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "ADMIN UNAUTHORIZED" });
  }

  next();
}