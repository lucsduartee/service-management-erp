export const useServiceStore = defineStore('service', {
  state: () => ({ services: [] }),

  getters: {
    tripleCount: (state) => state.count * 3,
  },

  actions: {
    async fetchServices() {
      const services = await $fetch(`${$config.public.SERVICES_API_HOST}/services`, {
        method: 'get',
      });

      this.services = services;
    },

    async fetchService(id) {
      const response = await $fetch(`${$config.public.SERVICES_API_HOST}/services/${id}`, {
        method: 'get',
      });

      return response?.service
    },
  },
});
