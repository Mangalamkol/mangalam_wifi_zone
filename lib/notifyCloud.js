import axios from "axios";

export async function notifyCloud(path, payload) {
  return axios.post(
    `${process.env.CLOUD_SERVER_URL}/agent/${path}`,
    payload,
    {
      headers: {
        "x-agent-secret": process.env.AGENT_SECRET
      }
    }
  );
}
