const oc200 = require("../utils/oc200Client");

exports.createVoucher = async (req, res) => {
  const { code, durationMinutes } = req.body;

  const result = await oc200.createVoucherOnOC200(code, durationMinutes);

  if (!result) return res.status(500).json({ error: "OC200 create failed" });

  res.json({ ok: true, result });
};

exports.customerLogin = async (req, res) => {
  const { mac, voucher } = req.body;

  // This part will use OC200 login API (Phase 2)
  return res.json({ ok: true, message: "Login API pending OC200 config" });
};

exports.getSessions = async (req, res) => {
    const sessions = await oc200.getActiveSessions();
    res.json(sessions);
};

exports.kickUser = async (req, res) => {
    const { mac } = req.body;
    try {
        await oc200.kickUser(mac);
        res.json({ success: true, message: `User with MAC ${mac} kicked successfully.` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};