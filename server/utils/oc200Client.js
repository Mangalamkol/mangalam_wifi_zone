const axios = require('axios');

const oc200Client = axios.create({
  baseURL: process.env.OC200_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10s timeout
});

let token = null; // In-memory token storage

// --- Authentication ---
const login = async () => {
  try {
    if (token) return token;
    const res = await oc200Client.post('/login', {
      username: process.env.OC200_USERNAME,
      password: process.env.OC200_PASSWORD,
    });
    token = res.data.result.token;
    return token;
  } catch (err) {
    console.error('OC200 Login Error:', err.message);
    token = null; // Clear token on failure
    throw new Error('Could not authenticate with OC200 controller');
  }
};

const logout = async () => {
  try {
    if (!token) return;
    await oc200Client.post('/logout', {}, { headers: { 'Authorization': `Bearer ${token}` } });
    token = null;
  } catch (err) {
    console.error('OC200 Logout Error:', err.message);
  }
};

// --- API Request Wrapper ---
const apiRequest = async (method, url, data = null) => {
  try {
    const authToken = await login();
    const response = await oc200Client({
      method,
      url,
      data,
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    return response.data.result;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Unauthorized, token might be expired. Clear it and retry once.
      token = null;
      const authToken = await login();
      const response = await oc200Client({
        method,
        url,
        data,
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      return response.data.result;
    }
    throw err; // Rethrow other errors
  }
};


// --- High-Level API Methods ---

const getAccessPoints = async () => {
  return await apiRequest('get', '/aps');
};

const getActiveSessions = async () => {
  return await apiRequest('get', '/clients'); // Assuming '/clients' gives session info
};

const disconnectClient = async (mac) => {
  return await apiRequest('post', `/clients/disconnect`, { mac });
};

const getApLoadInfo = async () => {
  const aps = await getAccessPoints();
  // This is a simplified representation. A real implementation would involve
  // more detailed stats from the controller, possibly from a different endpoint.
  return aps.map(ap => ({
    name: ap.name,
    mac: ap.mac,
    cpuLoad: Math.random() * 100, // Placeholder
    memoryUsage: Math.random() * 100 // Placeholder
  }));
};


module.exports = {
  login,
  logout,
  getAccessPoints,
  getActiveSessions,
  disconnectClient,
  getApLoadInfo,
};
