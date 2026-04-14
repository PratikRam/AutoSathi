const car = require('../models/Car.model');

const addCarController = async (req, res) => {
    try {
        const { vehicleName, registrationNumber, purchaseDate, generalServiceDate, insuranceExpiry, pucExpiry, imageUrl } = req.body
        const newCar = await car.create({
            userId: req.user.id,
            vehicleName,
            registrationNumber,
            purchaseDate,
            generalServiceDate,
            insuranceExpiry,
            pucExpiry,
            imageUrl
        })
        res.status(201).json({
            message: "Car added successfully",
            car: newCar
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' })
    }
}


// Get all cars of user
const getCarsController = async (req, res) => {
    try {
        const cars = await car.find({ userId: req.user.id })
        res.status(200).json({
            message: "Cars fetched successfully",
            cars
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' })
    }
}

// Delete a car by ID
const deleteCarController = async (req, res) => {
    try {
        const carId = req.params.id
        const deletedCar = await car.findByIdAndDelete(carId)
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' })
        }
        res.status(200).json({
            message: "Car deleted successfully",
            "this car deleted": deletedCar
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    addCarController,
    getCarsController,
    deleteCarController
}