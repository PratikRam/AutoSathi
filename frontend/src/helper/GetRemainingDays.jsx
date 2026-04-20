import { useMemo } from "react"
import useVehicleStore from "@/store/vehicleStore"

const useVehicleWithDays = () => {
    const { vehicles } = useVehicleStore()

    const getDaysLeft = (expiryDate) => {
        if (!expiryDate) return null

        const today = new Date()
        const expiry = new Date(expiryDate)
        const diff = expiry - today
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

    const vehiclesWithDays = useMemo(() => {
        return vehicles.map((vehicle) => ({
            ...vehicle,
            insuranceRemainingDays: getDaysLeft(vehicle.insuranceExpiry),
            pucRemainingDays: getDaysLeft(vehicle.pucExpiry),
            generalServiceRemainingDays: getDaysLeft(vehicle.generalServiceDate),
        }))
    }, [vehicles])

    return vehiclesWithDays
}

export default useVehicleWithDays