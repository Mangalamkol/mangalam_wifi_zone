const axios = require("axios");

const OC200_URL = process.env.OC200_URL;
const OC200_CLIENT_ID = process.env.OC200_CLIENT_ID;
const OC200_CLIENT_SECRET = process.env.OC200_CLIENT_SECRET;
const OC200_USERNAME = process.env.OC200_USERNAME;
const OC200_PASSWORD = process.env.OC200_PASSWORD;
const OMADA_ID = process.env.OMADA_ID;

async function getToken() {
  try {
    const resp = await axios.post(
      `${OC200_URL}/api/v2/login`,
      {
        username: OC200_USERNAME,
        password: OC200_PASSWORD,
      },
      { rejectUnauthorized: false } // Important for self-signed certs
    );
    return resp.data.result.token;
  } catch (err) {
    console.error("OC200 login failed", err.response ? err.response.data : err.message);
    return null;
  }
}

exports.createVoucherOnOC200 = async (code, duration) => {
  try {
    const token = await getToken();
    if (!token) return null;

    const resp = await axios.post(
      `${OC200_URL}/api/v2/sites/${OMADA_ID}/vouchers`,
      {
        name: code,
        usage_type: "multi", // Or "single"
        amount: 1,
        reusable: false,
        expire_time: duration || 60, // Duration in minutes
        note: "Auto-generated",
      },
      {
        headers: { "X-Csrf-Token": token },
        https: { rejectUnauthorized: false }, // Important for self-signed certs
      }
    );

    return resp.data;
  } catch (err) {
    console.error("OC200 voucher create failed:", err.response ? err.response.data : err.message);
    return null;
  }
};

exports.getActiveSessions = async () => {
  try {
    const token = await getToken();
    if (!token) return [];

    const resp = await axios.get(
      `${OC200_URL}/api/v2/sites/${OMADA_ID}/clients`,
      {
        headers: { "X-Csrf-Token": token },
        rejectUnauthorized: false
      }
    );

    return resp.data.result || resp.data.clients || [];
  } catch (err) {
    console.error("OC200 session fetch failed:", err.message);
    return [];
  }
};
