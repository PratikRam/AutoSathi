const transporter = require("../config/emailConfig");

const sendExpiryEmail = async (userEmail, userName, vehicleName, regNumber, docType, daysLeft) => {
  const subject = `⚠️ ${daysLeft < 0 ? "Expired" : `Expiring in ${daysLeft} Day${daysLeft > 1 ? "s" : ""}`} — ${docType} — ${vehicleName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      
      <div style="background-color: #1B3A6B; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Auto<span style="color:#00a2ffff;">Sathi</span> 🚗</h1>
      </div>

      <div style="padding: 30px;">  
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Your <strong> ${daysLeft < 0 ? docType + " Expired" : docType + " Expiring soon"}</strong></p>

        <div style="background-color: #fff4e5; border-left: 4px solid #ff9800; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Vehicle:</strong> ${vehicleName}</p>
          <p style="margin: 6px 0;"><strong>Registration:</strong> ${regNumber}</p>
          <p style="margin: 6px 0;"><strong>Document:</strong> ${docType}</p>
          <p style="margin: 6px 0; font-size: 18px; color: #e53935;">
            <strong>${daysLeft < 0 ? "⚠️ Expired" : `⏳ ${daysLeft} Day${daysLeft > 1 ? "s" : ""} Remaining`}</strong>
          </p>
        </div>

        <p>${daysLeft < 0 ? `Your ${docType} has expired. Please renew it.` : `Your ${docType} is expiring soon. Please renew it as soon as possible to avoid any inconvenience.`}</p>
        <p style="color: #aaa; font-size: 12px;">This is an automated reminder from AutoSathi.</p>
      </div>

    </div>
  `;

  await transporter.sendMail({
    from: `"AutoSathi" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject,
    html,
  });
};

module.exports = sendExpiryEmail;