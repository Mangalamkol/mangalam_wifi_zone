import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

export class Omada {
  constructor({ baseURL, username, password, omadacId }) {
    this.baseURL = baseURL;
    this.username = username;
    this.password = password;
    this.omadacId = omadacId;
    this.token = null;
  }

  async login() {
    const res = await axios.post(
      `${this.baseURL}/api/v2/login`,
      { username: this.username, password: this.password },
      { httpsAgent: agent }
    );
    this.token = res.data.result.token;
    return true;
  }

  async authorizeClient(mac, minutes) {
    const url = `${this.baseURL}/${this.omadacId}/api/v2/hotspot/clients/${mac}/authorize`;
    const payload = {
      duration: minutes,
      authType: 'by-portal'
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };

    return axios.post(url, payload, { headers, httpsAgent: agent });
  }

  async disconnectClient(mac) {
    const url = `${this.baseURL}/${this.omadacId}/api/v2/hotspot/clients/${mac}/unauthorize`;
    const headers = {
      'Authorization': `Bearer ${this.token}`
    };
    
    return axios.post(url, {}, { headers, httpsAgent: agent });
  }
}
