import { create } from 'zustand'

const useServiceStore = create((set) => ({
  // STATE
  services: [],
  loading: false,
  error: null,

  // ACTIONS
  setServices: (services) => set({ services }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Add Service to list
  addServiceToList: (newService) =>
    set((state) => ({
      services: [...state.services, newService]
    })),

  // Delete service from list
  removeService: (serviceId) =>
    set((state) => ({
      services: state.services.filter((service) => service._id !== serviceId)
    })),

  // Clear all services
  clearServices: () => set({ services: [], error: null })
}))

export default useServiceStore
