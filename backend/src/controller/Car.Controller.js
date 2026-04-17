const car = require('../models/Car.model');
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');

const addCarController = async (req, res) => {
    try {
        const { vehicleName, registrationNumber, purchaseDate, generalServiceDate, insuranceExpiry, pucExpiry } = req.body
        // console.log("file:", req.file);
        // console.log("body:", req.body);
        const image = req.file.buffer;
        
        if (!image) {
            return res.status(400).json({ message: 'Image is required' })
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "vehicles",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        console.log("result is", result);
        const imageUrl = result.secure_url;
        console.log("imageUrl is", imageUrl);

        const newCar = await car.create({
            userId: req.user.id,
            vehicleName,
            registrationNumber,
            purchaseDate,
            generalServiceDate,
            insuranceExpiry,
            pucExpiry,
            image: imageUrl

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
        const cars = await car.find({ userId: req.user.id }).sort({ createdAt: -1 })
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