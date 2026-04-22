const cron = require("node-cron");
const Car = require("../models/Car.model");
const User = require("../models/User.model");
const sendExpiryEmail = require("../utils/sendExpiryEmail");
const getDaysLeft = require("../utils/getDaysLeft");

const checkExpiry = async () => {
    console.log("⏰ Running expiry check:", new Date().toLocaleString());

    try {
        const cars = await Car.find();

        for (const car of cars) {
            const user = await User.findById(car.userId);
            if (!user) continue;

            const insuranceremainingdays = getDaysLeft(car.insuranceExpiry);
            const pucremainingdays = getDaysLeft(car.pucExpiry);

            if (insuranceremainingdays !== null && insuranceremainingdays >= 0 && insuranceremainingdays <= 7) {
                await sendExpiryEmail(
                    user.email,
                    user.name,
                    car.vehicleName,
                    car.registrationNumber,
                    "Insurance",
                    insuranceremainingdays
                );
                console.log(`✅ Insurance email sent → ${user.email} (${car.vehicleName}) — ${insuranceremainingdays} days left`);
            }

            if (pucremainingdays !== null && pucremainingdays >= 0 && pucremainingdays <= 7) {

                await sendExpiryEmail(
                    user.email,
                    user.name,
                    car.vehicleName,
                    car.registrationNumber,
                    "PUC Certificate",
                    pucremainingdays
                );
                console.log(`✅ PUC email sent → ${user.email} (${car.vehicleName}) — ${pucremainingdays} days left`);

            }
            else if (pucremainingdays < 0) {
                await sendExpiryEmail(
                    user.email,
                    user.name,
                    car.vehicleName,
                    car.registrationNumber,
                    "PUC Certificate",
                    "-1"
                );
                console.log(`✅ PUC email sent → ${user.email} (${car.vehicleName}) — Expired`);
            }
        }

        console.log("✅ Expiry check complete");

    } catch (error) {
        console.error("❌ Expiry check failed:", error.message);
    }
};

// Runs every day at 8:00 AM
// To test: change "0 8 * * *"  →  "* * * * *"  (every minute)
const scheduleExpiryJob = () => {
    cron.schedule("0 8 * * *", checkExpiry);
    checkExpiry();
    console.log("📅 Expiry checker scheduled — runs daily at 8:00 AM");
};

module.exports = scheduleExpiryJob;