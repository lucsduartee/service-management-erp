export const useTabsStore = defineStore('tabs', {
  state: () => ({
    pages: [
      {
        name: 'services',
        selectedTab: 'createService',
        tabs: {
          createService: 'Cadastrar serviço',
          listService: 'Listar serviços',
        },
      },
      {
        name: 'accounts-management',
        selectedTab: 'createUser',
        tabs: {
          createUser: 'Cadastrar usuário',
          listUser: 'Listar usuários',
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
