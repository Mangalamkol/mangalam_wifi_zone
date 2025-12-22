import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });

import { Omada } from "../lib/Omada.js";

const { OC200_URL, OC200_USERNAME, OC200_PASSWORD, OC200_SITE_ID } = process.env;

async function main() {
  console.log("🔐 Authenticating with OC200...");

  try {
    const omada = new Omada({
      baseURL: OC200_URL,
      username: OC200_USERNAME,
      password: OC200_PASSWORD,
      omadacId: OC200_SITE_ID
    });

    await omada.login();

    console.log("✅ OC200 TEST SUCCEEDED");
  } catch (error) {
    console.error("❌ OC200 TEST FAILED");
    console.error(error.message);
  }
}

main();
