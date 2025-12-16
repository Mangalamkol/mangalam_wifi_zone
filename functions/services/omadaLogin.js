import axios from '''axios''';
import https from '''https''';

export default async (req, res) => {
  try {
    const { OC200_URL, OC200_USERNAME, OC200_PASSWORD } = process.env;

    const loginUrl = `${OC200_URL}/api/v2/login`;

    // The Omada controller might be using a self-signed SSL certificate.
    // In a development environment, or when the controller is on a local network,
    // you may need to disable SSL certificate validation. 
    // This is a security risk if your controller is exposed to the public internet.
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    const response = await axios.post(loginUrl, {
      username: OC200_USERNAME,
      password: OC200_PASSWORD
    }, { httpsAgent: agent });

    // Based on Omada API documentation, a successful login returns a token.
    if (response.data && response.data.result && response.data.result.token) {
      res.status(200).json({ token: response.data.result.token });
    } else {
      res.status(response.status || 401).json({ message: '''Authentication failed. Invalid response from Omada controller.''', details: response.data });
    }
  } catch (error) {
    console.error('''Error logging into Omada controller:''', error.message);
    if (error.response) {
      res.status(error.response.status).json({ message: '''Error from Omada controller''', details: error.response.data });
    } else {
      res.status(500).json({ message: '''Internal server error while trying to connect to Omada controller.''' });
    }
  }
};
