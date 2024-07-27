export const useTabsStore = defineStore('tabs', {
  state: () => ({
    pages: [
      {
        name: 'services',
        selectedTab: 'createService',
        tabsTitles: {
          createService: 'Cadastrar serviço',
          listService: 'Listar serviços',
        },
      },
      {
        name: 'accountsManagement',
        selectedTab: '',
        tabsTitles: {
          createService: 'Cadastrar usuário',
          listService: 'Listar usuários',
        },
      },
    ],
  }),

  actions: {
    selectTab(page, tab) {
      this.pages.find((p) => p.name === page).selectedTab = tab;
    },
  },
});
