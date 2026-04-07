const express = require('express');
const AuthRoutes = require('./routes/auth.Routes')
const CarRoutes = require('./routes/car.Routes')
const ServiceRoutes = require('./routes/Service.Routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// auth routes
app.use('/register', AuthRoutes)

app.use("/login", AuthRoutes)

// car routes
app.use('/addCars', CarRoutes)
app.use('/getCars', CarRoutes)
app.use('/deleteCar', CarRoutes)

// service routes
app.use('/addService', ServiceRoutes)
app.use('/getService', ServiceRoutes)
app.use('/deleteService', ServiceRoutes)

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