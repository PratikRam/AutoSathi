const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    serviceDate: {
        type: Date,
        required: true
    },
    garageName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    },
}, { timestamps: true })

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service