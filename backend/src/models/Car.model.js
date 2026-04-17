const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    generalServiceDate: {
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
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Car = mongoose.model('Car', carSchema)

module.exports = Car;