const oc200 = require("../utils/oc200Client"); // adjust path if yours differs

// Returns list of APs with instant load and client info
exports.getAPLoad = async (req, res) => {
  try {
    // get AP list and metrics (oc200Client should provide)
    const [aps, metrics, sessions] = await Promise.all([
      oc200.getAPList(),        // [{ name, mac, ip, id }]
      oc200.getAPMetrics(),     // ideally returns { apMac: { rxKbps, txKbps, clients } }
      oc200.getActiveSessions() // fallback client info if needed
    ]);

    // build normalized output per AP
    const apMap = aps.map(ap => {
      const m = metrics && metrics[ap.mac] ? metrics[ap.mac] : null;
      // fallback: calculate from sessions if metrics missing
      const clients = sessions ? sessions.filter(s => (s.apMac === ap.mac || s.uplinkAP === ap.mac)) : [];
      let rx = m ? m.rxKbps : clients.reduce((sum, c) => sum + (c.downSpeed || 0), 0);
      let tx = m ? m.txKbps : clients.reduce((sum, c) => sum + (c.upSpeed || 0), 0);

      return {
        apName: ap.name || ap.id || "AP",
        apMac: ap.mac,
        apIP: ap.ip || null,
        rxKbps: Math.round(rx),
        txKbps: Math.round(tx),
        clientCount: clients.length,
        clients: clients.map(c => ({
          mac: c.mac,
          ipAddress: c.ipAddress || c.ip || null,
          hostName: c.hostName || c.hostname || null,
          downSpeed: c.downSpeed || c.rx || 0,
          upSpeed: c.upSpeed || c.tx || 0,
          signal: c.signal || c.rssi || null,
          voucherCode: c.voucherCode || c.coupon || null
        }))
      };
    });

    res.json({ success: true, data: apMap, ts: Date.now() });
  } catch (err) {
    console.error("getAPLoad error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};