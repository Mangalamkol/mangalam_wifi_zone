const axios = require("axios");

exports.approveDevice = async (base, mac, ssid, apMac) => {
  return axios.get(`${base}/portal/auth`, {
    params: {
      clientMac: mac,
      apMac,
      ssid
    }
  });
};