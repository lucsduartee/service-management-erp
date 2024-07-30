<template>
  <div>
    <h1 class="mb-10">Gerenciador de usuários</h1>
    <tabs />
    <v-divider class="my-5" />
    <accounts-registration-form v-show="selectedTab === 'createUser'"/>
    <accounts-table v-show="selectedTab === 'listUser'" />
  </div>
</template>

<script setup>
import { useTabsStore } from '~/stores/tabs';

const { name } = useRoute();
const tabsStore = useTabsStore();
const { pages } = storeToRefs(tabsStore);

const selectedTab = computed(() => pages.value.find(page => page.name === name).selectedTab);
</script>