import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'server', 'config', 'adminLiveConfig.js');

const getAdminConfig = () => {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const adminConfig = {};
    const regex = /(\w+)\s*:\s*(true|false)/g;
    let match;
    while ((match = regex.exec(configContent)) !== null) {
        adminConfig[match[1]] = match[2] === 'true';
    }
    return adminConfig;
}

const writeAdminConfig = (newConfig) => {
    let configContent = fs.readFileSync(configPath, 'utf8');
    for (const key in newConfig) {
        if (Object.hasOwnProperty.call(newConfig, key)) {
            const value = newConfig[key];
            const regex = new RegExp(`(${key}\s*:\s*)(true|false)`);
            if (regex.test(configContent)) {
                configContent = configContent.replace(regex, `$1${value}`);
            }
        }
    }
    fs.writeFileSync(configPath, configContent, 'utf8');
}


export const getStatus = (req, res) => {
    try {
        const adminConfig = getAdminConfig();
        res.status(200).json(adminConfig);
    } catch (e) {
        res.status(500).send('Error reading admin config');
    }
};

export const updateStatus = (req, res) => {
    try {
        const adminConfig = getAdminConfig();
        const updates = req.body;
        const newConfig = { ...adminConfig, ...updates };
        writeAdminConfig(newConfig);
        res.status(200).json({ message: 'Admin status updated successfully.', newConfig });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating admin config');
    }
};
