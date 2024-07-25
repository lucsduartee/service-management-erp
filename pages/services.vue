<template>
  <div>
    <h1 class="mb-10">Serviços</h1>
    <tabs />
    <v-divider class="my-10" />
    <services-registration-form v-show="selectedTab === 'createService'"/>
    <services-table v-show="selectedTab === 'listService'" />
</div>
</template>

<script setup>
import { useTabsStore } from '~/stores/tabs';

const { name } = useRoute();
const tabsStore = useTabsStore();
const { pages } = storeToRefs(tabsStore);

const selectedTab = computed(() => pages.value.find(page => page.name === name).selectedTab);
console.log('selectedTab', selectedTab)

</script>
