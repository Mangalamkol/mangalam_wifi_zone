import jwt from "jsonwebtoken";

export const signAdminToken = (admin) =>
  jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );