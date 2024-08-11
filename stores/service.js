export const useServiceStore = defineStore('service', {
  state: () => ({ services: [] }),

  getters: {
    tripleCount: (state) => state.count * 3,
  },

  actions: {
    async fetchServices() {
      console.log('fetching services');
      const { data: services } = await $fetch('api/service', {
        method: 'GET',
      });

      this.services = services;
    },
  },
});
