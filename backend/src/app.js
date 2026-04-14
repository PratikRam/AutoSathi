const express = require('express');
const AuthRoutes = require('./routes/auth.Routes')
const CheckAuthRoutes = require("./routes/checkAuth.Route")
const CarRoutes = require('./routes/car.Routes')
const ServiceRoutes = require('./routes/Service.Routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())
// console.log("auth :", AuthRoutes);

// auth routes
app.use('/api/auth', AuthRoutes)

//checkauth routes
app.use("/api", CheckAuthRoutes)

// car routes
app.use('/car', CarRoutes)

// service routes
app.use('/service', ServiceRoutes)

module.exports = app;


// {
//     "carName": "harrier",
//     "registrationNumber": "4445",
//     "purchaseDate": "2027",
//     "insuranceExpiry": "2032",
//     "pucExpiry": "2028",
//     "imageUrl": "sdgfgiuh"
// }

// {
//     "serviseDate": "17/02/2026",
//     "garageName": "sodhi garage",
//     "cost": "1500",
//     "note": "oil change"
// }