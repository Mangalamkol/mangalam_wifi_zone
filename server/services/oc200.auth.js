import axios from "axios";
import https from "https";

const { OC200_URL, OC200_USERNAME, OC200_PASSWORD, OMADA_ID } = process.env;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

let token = null;
let tokenExpire = 0;

export async function getOcToken() {
  if (token && Date.now() < tokenExpire) {
    return token;
  }

  try {
    const res = await axios.post(
      `${OC200_URL}/proxy/network/api/s/${OMADA_ID}/login`,
      {
        username: OC200_USERNAME,
        password: OC200_PASSWORD,
      },
      { httpsAgent: agent }
    );

    token = res.headers["set-cookie"];
    tokenExpire = Date.now() + 1000 * 60 * 20; // 20 min
    return token;
  } catch (error) {
    console.error("Failed to login to Omada controller. Please check your credentials and that the controller is running.", error.response ? error.response.data : error.message);
    token = null; // Clear token on failure
    throw new Error("Omada controller login failed.");
  }
}
