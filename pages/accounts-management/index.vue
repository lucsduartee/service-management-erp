<template>
  <div>
    <h1 class="mb-8 text-2xl">Gerenciador de usuários</h1>
    <breadcrumb />
    <tabs />
    <v-divider class="my-5" />
    <accounts-registration-form v-show="selectedTab === 'createUser'"/>
    <accounts-table v-show="selectedTab === 'listUser'" />
  </div>
</template>

<script setup>
import { useTabsStore } from '~/stores/tabs';
import { useBreadcrumbStore } from '~/stores/breadcrumb';

const { name } = useRoute();
const tabsStore = useTabsStore();
const { pages } = storeToRefs(tabsStore);

const breadcrumbStore = useBreadcrumbStore();

const selectedTab = computed(() => pages.value.find(page => page.name === name).selectedTab);

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();

  breadcrumbStore.pushItem({
    title: "Gerenciador de usuários",
    disabled: true,
    href: "/accounts-management",
  });
});

definePageMeta({
  middleware: ['auth']
})
</script>