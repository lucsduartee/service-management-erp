export const useTabsStore = defineStore('tabs', {
  state: () => ({
    pages: [
      {
        name: 'services',
        selectedTab: 'createService',
      },
      {
        name: 'accountsManagement',
        selectedTab: '',
      },
    ],
  }),

  actions: {
    selectTab(page, tab) {
      this.pages.find((p) => p.name === page).selectedTab = tab;
    },
  },
});
