import { login, logout } from '../server/utils/oc200Client.js';
import fs from 'fs';

async function verifyOC200() {
    let status = { oc200: { login: false, logout: false } };
    try {
        await login();
        status.oc200.login = true;
        console.log('OC200 login successful.');

        await logout();
        status.oc200.logout = true;
        console.log('OC200 logout successful.');
    } catch (error) {
        console.error('OC200 verification failed:', error.message);
    } finally {
        let existingStatus = {};
        try {
            const data = fs.readFileSync('./status.json', 'utf8');
            existingStatus = JSON.parse(data);
        } catch (error) {
            // Ignore if file doesn't exist
        }

        fs.writeFileSync('./status.json', JSON.stringify({ ...existingStatus, ...status }, null, 2));
    }
}

verifyOC200();
