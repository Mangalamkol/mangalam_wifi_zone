import dotenv from 'dotenv';
import fs from 'fs';

const expectedVars = [
    'MONGODB_URI',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'RAZORPAY_WEBHOOK_SECRET',
    'OC200_USERNAME',
    'OC200_PASSWORD',
    'JWT_SECRET',
];

const result = {
    missing: [],
    present: [],
};

dotenv.config({ path: '../server/.env' });

for (const v of expectedVars) {
    if (process.env[v]) {
        result.present.push(v);
    } else {
        result.missing.push(v);
    }
}

fs.writeFileSync('./status.json', JSON.stringify({ env: result }, null, 2));

if (result.missing.length > 0) {
    console.error(`Missing environment variables: ${result.missing.join(', ')}`);
    process.exit(1);
}

console.log('Environment variables verified successfully.');
