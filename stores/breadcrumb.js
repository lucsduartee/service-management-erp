export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: () => ({
    breadcrumb: [
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
    ]
  }),

  actions: {
    setInitialBreadcrumb() {
      this.breadcrumb = [
        {
          title: 'Home',
          disabled: true,
          href: '/',
        },
      ];
    },

    pushItem() {
      this.breadcrumb.push(...arguments);

      this.breadcrumb = this.breadcrumb.map((item, index) => {
        if (index === this.breadcrumb.length - 1) return item;

        return {
          ...item,
          disabled: false,
        };
      });
    },
  },
});