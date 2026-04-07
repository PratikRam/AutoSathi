const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    VehicleName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date
    },
    insuranceExpiry: {
        type: Date,
        required: true
    },
    pucExpiry: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true })

const Car = mongoose.model('Car', carSchema)

module.exports = Car;