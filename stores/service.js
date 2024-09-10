export const useServiceStore = defineStore('service', {
  state: () => ({ services: [] }),

  actions: {
    async fetchServices() {
      const { getItems } = useDirectusItems();

      const items = await getItems({
        collection: "services",
      });

      this.services = items;
    },

    async fetchService(id) {
      const { getItemById } = useDirectusItems();
      const item = await getItemById({
        collection: "services",
        id: id,
      });

      return item;
    },
  },
});
