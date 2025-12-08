const axios = require("axios");

const oc200 = axios.create({
  baseURL: process.env.OC200_URL,
  timeout: 10000,
});

// This promise will be used to ensure login only happens once, even with concurrent requests.
let loginPromise = null;

async function login() {
  try {
    const res = await oc200.post("/api/v2/login", {
      username: process.env.OC200_USERNAME,
      password: process.env.OC200_PASSWORD,
    });
    // Store the cookie for subsequent requests
    oc200.defaults.headers.Cookie = res.headers["set-cookie"];
  } catch (error) {
    // If login fails, we need to reset the promise to allow for a retry.
    loginPromise = null;
    // Re-throw the error to be caught by the caller.
    throw new Error("Failed to log in to OC200 controller.");
  }
}

function ensureLoggedIn() {
  if (!loginPromise) {
    loginPromise = login();
  }
  return loginPromise;
}

// Response interceptor to handle session expiry
oc200.interceptors.response.use(
  (response) => {
    // If the response has an error code, reject it so it can be handled as an error.
    if (response.data && response.data.errorCode !== 0) {
      return Promise.reject({ response });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response && error.response.data ? error.response.data.errorCode : null;
    const status = error.response ? error.response.status : null;

    // Check for session-related errors.
    // -40002: Login required
    // 401/403: Unauthorized/Forbidden
    if ((status === 401 || status === 403 || errorCode === -40002) && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we are retrying this request.
      loginPromise = null; // Reset login promise to force a new login.
      try {
        await ensureLoggedIn(); // Attempt to log in again.
        return oc200(originalRequest); // Retry the original request.
      } catch (loginError) {
        return Promise.reject(loginError); // If re-login fails, reject the promise.
      }
    }

    // For other errors, just reject the promise.
    return Promise.reject(error);
  }
);


// Active Clients
async function getActiveClients() {
  await ensureLoggedIn();
  const res = await oc200.get(`/api/v2/sites/${process.env.OMADA_ID}/clients`);
  return res.data.result.data;
}

// Kick User
async function kickUser(mac) {
  await ensureLoggedIn();
  const res = await oc200.post(`/api/v2/sites/${process.env.OMADA_ID}/cmd/kick`, {
    mac,
  });
  return res.data;
}

// AP Info
async function getAPInfo() {
  await ensureLoggedIn();
  const res = await oc200.get(`/api/v2/sites/${process.env.OMADA_ID}/accessPoints`);
  return res.data.result.data;
}

module.exports = {
  getActiveClients,
  kickUser,
  getAPInfo,
};