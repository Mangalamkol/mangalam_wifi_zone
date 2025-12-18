
const admin = require('./firebaseAdmin'); // Use the new centralized initialization
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

const plans = [
    {
        "name": "Free Trial",
        "price": 0,
        "validity": 2,
        "data_limit": 200
    },
    {
        "name": "Basic",
        "price": 100,
        "validity": 28,
        "data_limit": 1000
    },
    {
        "name": "Premium",
        "price": 200,
        "validity": 28,
        "data_limit": 5000
    },
    {
        "name": "Ultimate",
        "price": 500,
        "validity": 84,
        "data_limit": 20000
    }
];

const seedDB = async () => {
    try {
        for (let i = 0; i < plans.length; i++) {
            await db.collection('plans').add(plans[i]);
        }
        console.log("Data seeded successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        // It's good practice to close the app connection if the script is standalone
        // but since this might be part of a larger app, we'll leave it open.
        process.exit();
    }
}

seedDB();
