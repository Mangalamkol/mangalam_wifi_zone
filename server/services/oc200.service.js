import axios from 'axios';
import Device from '../models/device.model.js';
import Plan from '../models/plan.model.js';

async function getOc200Token() {
    // Implement logic to get the OC200 token
    // This might involve reading it from a file, an environment variable, or a database
    return process.env.OC200_TOKEN;
}

export async function startOC200Session(mac, planId) {
    const plan = await Plan.findById(planId);
    if (!plan) {
        throw new Error('Plan not found');
    }

    const token = await getOc200Token();

    // Logic to authorize the user on the OC200
    await axios.post(`${process.env.OC200_HOST}/api/v2/hotspot/login`, {
        mac: mac,
        duration: plan.durationInMinutes,
    }, { headers: { Authorization: `Bearer ${token}` } });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + plan.durationInMinutes);

    const device = new Device({
        mac: mac,
        plan: planId,
        expiresAt: expiresAt,
    });

    await device.save();
}

export async function ocUnauthorize(mac) {
    const token = await getOc200Token();

    // Logic to unauthorize the user on the OC200
    await axios.post(`${process.env.OC200_HOST}/api/v2/hotspot/logout`, {
        mac: mac,
    }, { headers: { Authorization: `Bearer ${token}` } });
}
