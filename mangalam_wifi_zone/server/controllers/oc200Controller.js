const { getActiveClients, kickUser, getAPInfo } = require('../utils');

exports.getActiveClients = async (req, res) => {
  try {
    const clients = await getActiveClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.kickUser = async (req, res) => {
  try {
    const { mac } = req.body;
    const result = await kickUser(mac);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAPInfo = async (req, res) => {
  try {
    const apInfo = await getAPInfo();
    res.json(apInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};