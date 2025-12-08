// server/controllers/oc200Controller.js
const axios = require('axios');

exports.loginToController = async (req, res) => {
  const { host, username, password } = req.body;
  // Example flow: authenticate and return session token; adapt to your OC200 API
  try {
    const resp = await axios.post(`${host}/api/v2/login`, { username, password }, { timeout: 5000 });
    res.json({ ok: true, session: resp.data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyCouponToClient = async (req, res) => {
  const { controllerHost, sessionToken, mac, couponCode } = req.body;
  // Implementation will depend on your OC200 controller API
  res.json({ ok: true, applied: true });
};

exports.status = async (req, res) => res.json({ ok: true });
