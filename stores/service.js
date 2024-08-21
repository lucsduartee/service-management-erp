export const useServiceStore = defineStore('service', {
  state: () => ({ services: [] }),

  getters: {
    tripleCount: (state) => state.count * 3,
  },

  actions: {
    async fetchServices() {
      const response = await $fetch('http://localhost:3001/api/services', {
        method: 'get',
      });

      this.services = response?.services;
    },

    async fetchService(id) {
      const response = await $fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'get',
      });

      return response?.service
    },
  },
});
