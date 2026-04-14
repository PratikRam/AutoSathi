import { create } from 'zustand'

const useServiceStore = create((set) => ({
  // STATE
  services: [],
  loading: false,
  error: null,

  // ACTIONS
  setVehicles: (services) => set({ services }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Add Service to list
  addServiceToList: (newService) =>
    set((state) => ({
      vehicles: [...state.services, newService]
    })),

  // Delete service from list
  removeVehicle: (serviceId) =>
    set((state) => ({
      vehicles: state.services.filter((service) => service._id !== serviceId)
    })),

  // Clear all services
  clearServices: () => set({ services: [], error: null })
}))

export default useServiceStore
