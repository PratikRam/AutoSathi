const cron = require("node-cron");
const Car = require("../models/Car.model");
// const User = require("../models/User.model");    
const sendExpiryEmail = require("../utils/sendExpiryEmail");
const getDaysLeft = require("../utils/getDaysLeft");

const checkExpiry = async () => {
    console.log("⏰ Running expiry check:", new Date().toLocaleString());

    try {
        const cars = await Car.find().populate("userId", "name email");

        for (const car of cars) {
            const user = car.userId;
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
            else if (insuranceremainingdays < 0) {
                await sendExpiryEmail(
                    user.email,
                    user.name,
                    car.vehicleName,
                    car.registrationNumber,
                    "Insurance",
                    "-1"
                );
                console.log(`✅ Insurance email sent → ${user.email} (${car.vehicleName}) — Expired`);
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

const scheduleExpiryJob = () => {
    cron.schedule("*/3 * * * *", checkExpiry);
    checkExpiry();
    console.log("📅 Expiry checker scheduled — runs every 3 minutes");
};

module.exports = scheduleExpiryJob;