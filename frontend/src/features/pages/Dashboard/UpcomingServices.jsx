import React, { useEffect, useState } from 'react'
import { Calendar, Car, Wrench, AlertTriangle, Loader2 } from 'lucide-react'
import { getVehicle } from '@/api/services/vehicle.api'

const UpcomingServices = () => {
    const [upcomingServices, setUpcomingServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUpcomingServices()
    }, [])

    const fetchUpcomingServices = async () => {
        try {
            const response = await getVehicle()

            const vehicles = response.cars || []

            const data = vehicles
                .map((vehicle) => {
                    const services = [
                        vehicle.insuranceExpiry && {
                            type: "Insurance Renewal",
                            date: vehicle.insuranceExpiry,
                            cost: 1500,
                        },

                        vehicle.pucExpiry && {
                            type: "PUC Renewal",
                            date: vehicle.pucExpiry,
                            cost: 150,
                        },
                    ]
                        .filter(Boolean)
                        .sort((a, b) => new Date(a.date) - new Date(b.date))

                    return {
                        id: vehicle._id,
                        vehicleName: vehicle.vehicleName,
                        vehicleImg: vehicle.vehicleImage,
                        services,
                    }
                })
                .filter((vehicle) => vehicle.services.length > 0)
                .sort(
                    (a, b) =>
                        new Date(a.services[0].date) -
                        new Date(b.services[0].date)
                )

            setUpcomingServices(data)
        } catch (error) {
            console.log("Failed to fetch upcoming services:", error)
        } finally {
            setLoading(false)
        }
    }

    const getDaysLeft = (date) => {
        return Math.ceil(
            (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
        )
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="animate-spin text-blue-600" />
                Loading upcoming services...
            </div>
        )
    }

    return (
        <section className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <header>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Upcoming Services
                    </h1>

                    <p className="text-gray-500">
                        Track your upcoming vehicle maintenance schedules
                    </p>
                </header>

                {/* Empty State */}
                {!upcomingServices.length ? (
                    <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                        <AlertTriangle
                            size={50}
                            className="mx-auto mb-4 text-gray-400"
                        />

                        <h2 className="text-xl font-semibold">
                            No Upcoming Services
                        </h2>

                        <p className="text-gray-500">
                            You're all set for now 🚗
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {upcomingServices.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                            >
                                {/* Vehicle */}
                                <div className="flex items-center gap-3 border-b pb-4 mb-4">
                                    <div className="bg-blue-50 p-3 rounded-xl">
                                        <Car
                                            size={22}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <h2 className="text-lg font-bold">
                                        {vehicle.vehicleName}
                                    </h2>
                                </div>

                                {/* Services */}
                                <div className="space-y-3">
                                    {vehicle.services.map((service, index) => {
                                        const daysLeft = getDaysLeft(service.date)
                                        const isOverdue = daysLeft < 0

                                        const statusClass = isOverdue
                                            ? "bg-red-100 text-red-600"
                                            : daysLeft <= 7
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-600"

                                        return (
                                            <div
                                                key={index}
                                                className="rounded-xl border bg-gray-50 p-3 space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="flex items-center gap-2 font-semibold text-sm">
                                                        <Wrench
                                                            size={15}
                                                            className="text-blue-500"
                                                        />
                                                        {service.type}
                                                    </p>

                                                    <span
                                                        className={`text-[11px] px-2 py-1 rounded-full font-bold ${statusClass}`}
                                                    >
                                                        {isOverdue
                                                            ? `${Math.abs(daysLeft)}d overdue`
                                                            : `${daysLeft}d left`}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <p className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {service.date}
                                                    </p>

                                                    <span>
                                                        ₹{service.cost}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default UpcomingServices