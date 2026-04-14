import { create } from 'zustand'

const useVehicleStore = create((set) => ({
  // STATE
  vehicles: [],
  loading: false,
  error: null,

  // ACTIONS
  setVehicles: (vehicles) => set({ vehicles }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Add vehicle to list
  addVehicleToList: (newVehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, newVehicle]
    })),

  // Delete vehicle from list
  removeVehicle: (vehicleId) =>
    set((state) => ({
      vehicles: state.vehicles.filter((vehicle) => vehicle._id !== vehicleId)
    })),

  // Clear all vehicles
  clearVehicles: () => set({ vehicles: [], error: null })
}))

export default useVehicleStore
