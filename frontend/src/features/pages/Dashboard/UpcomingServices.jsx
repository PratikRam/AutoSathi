import React, { useEffect, useState } from 'react'
import { Calendar, Car, Wrench, AlertTriangle, Loader2 } from 'lucide-react'

const UpcomingServices = () => {
    const [upcomingServices, setUpcomingServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Replace with API call
        const mockData = [
            {
                id: 1,
                vehicleName: "Honda City",
                serviceType: "Oil Change",
                nextServiceDate: "2026-05-02",
                cost: 2500,
            },
            {
                id: 2,
                vehicleName: "Activa 6G",
                serviceType: "Brake Check",
                nextServiceDate: "2026-04-28",
                cost: 1800,
            },
            {
                id: 3,
                vehicleName: "Royal Enfield",
                serviceType: "General Service",
                nextServiceDate: "2026-04-20",
                cost: 4000,
            }
        ]

        setTimeout(() => {
            setUpcomingServices(mockData)
            setLoading(false)
        }, 800)
    }, [])

    const getDaysLeft = (date) => {
        const today = new Date()
        const serviceDate = new Date(date)

        const diffTime = serviceDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays
    }

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2 h-screen">
               < Loader2 className='animate-spin text-blue-600' /> Loading upcoming services...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Upcoming Services
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track your upcoming vehicle maintenance schedules
                    </p>
                </div>

                {/* Empty State */}
                {upcomingServices.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <AlertTriangle className="mx-auto text-gray-400 mb-4" size={50} />
                        <h2 className="text-xl font-semibold">No Upcoming Services</h2>
                        <p className="text-gray-500 mt-2">
                            You're all set for now 🚗
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingServices.map((service) => {
                            const daysLeft = getDaysLeft(service.nextServiceDate)
                            const isOverdue = daysLeft < 0

                            return (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                                >

                                    {/* Vehicle */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <Car className="text-blue-600" size={20} />
                                        <h2 className="font-bold text-lg">
                                            {service.vehicleName}
                                        </h2>
                                    </div>

                                    {/* Service Type */}
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <Wrench size={18} />
                                        <span>{service.serviceType}</span>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <Calendar size={18} />
                                        <span>{service.nextServiceDate}</span>
                                    </div>

                                    {/* Cost */}
                                    <p className="text-sm text-gray-500 mb-4">
                                        Estimated Cost: ₹{service.cost}
                                    </p>

                                    {/* Status Badge */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${isOverdue
                                                ? "bg-red-100 text-red-600"
                                                : daysLeft <= 7
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {isOverdue
                                            ? `${Math.abs(daysLeft)} days overdue`
                                            : `${daysLeft} days left`}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpcomingServices