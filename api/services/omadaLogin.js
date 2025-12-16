import axios from 'axios';
import https from 'https-proxy-agent'; // Corrected import for agent
import 'dotenv/config';

export default async (req, res) => {
  try {
    const { OC200_URL, OC200_USERNAME, OC200_PASSWORD } = process.env;

    if (!OC200_URL || !OC200_USERNAME || !OC200_PASSWORD) {
      return res.status(500).json({ message: 'Server configuration error: Missing Omada credentials.' });
    }

    const loginUrl = `${OC200_URL}/api/v2/login`;

    // The Omada controller uses a self-signed SSL certificate.
    // We must disable SSL certificate validation for the connection to work.
    const agent = new https.HttpsProxyAgent({
      rejectUnauthorized: false
    });

    const response = await axios.post(loginUrl, {
      username: OC200_USERNAME,
      password: OC200_PASSWORD
    }, { httpsAgent: agent });

    if (response.data && response.data.result && response.data.result.token) {
      res.status(200).json({ token: response.data.result.token });
    } else {
      res.status(response.status || 401).json({ 
        message: 'Authentication failed. Invalid response from Omada controller.', 
        details: response.data 
      });
    }
  } catch (error) {
    console.error('Error logging into Omada controller:', error.message);
    let status = 500;
    let message = 'Internal server error while connecting to the Omada controller.';
    let details = {};

    if (error.response) {
        status = error.response.status;
        message = 'Error from Omada controller';
        details = error.response.data;
    } else if (error.code === 'ECONNREFUSED') {
        status = 503; // Service Unavailable
        message = `Connection refused. Could not connect to Omada controller at ${process.env.OC200_URL}. Check if the controller is running and accessible.`;
    }

    res.status(status).json({ message, details });
  }
};
