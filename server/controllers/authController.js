const Admin = require("../models/Admin");
const ActivityLog = require("../models/ActivityLog");
const bcrypt = require("bcryptjs");
const { sign } = require("../utils/jwt");
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    await ActivityLog.create({ action: "Admin Registered", adminUser: username });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await ActivityLog.create({ action: "Admin Login", adminUser: username });

    res.json({ token: sign({ username }) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};