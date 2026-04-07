const car = require('../models/Service.model');

const addServiceController = async (req, res) => {
    try {
        const { serviceDate, garageName, cost, notes } = req.body;
        const ServiceCar = await car.create({
            // userId: req.user.id,
            carId: req.params.carId,
            serviceDate,
            garageName,
            cost,
            notes: notes
        });
        res.status(201).json({
            message: 'Service added successfully', ServiceCar

        })
    } catch (error) {
        res.status(500).json({ message: 'Error adding service', error });
    }
}

const getServicesController = async (req, res) => {
    try {
        const services = await car.find({ carId: req.params.carId });
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
}


const deleteService = async (req, res) => {
    try {
        const service = await car.findById(req.params.id)

        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }

        // if (service.userId.toString() !== req.user.id) {
        //     return res.status(401).json({ message: 'Not authorized' })
        // }

        await service.deleteOne()
        res.status(200).json({ message: 'Service deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    addServiceController,
    getServicesController,
    deleteService
}