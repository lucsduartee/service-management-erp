<template>
  <div>
    <h1 class="mb-8 text-2xl">Serviços</h1>
    <breadcrumb />
    <tabs />
    <v-divider class="my-5" />
    <services-registration-form v-show="selectedTab === 'createService'" />
    <services-table v-show="selectedTab === 'listService'" />
  </div>
</template>

<script setup>
import { useTabsStore } from "~/stores/tabs";
import { useBreadcrumbStore } from "~/stores/breadcrumb";

const { name } = useRoute();
const tabsStore = useTabsStore();
const { pages } = storeToRefs(tabsStore);

const breadcrumbStore = useBreadcrumbStore();

const selectedTab = computed(
  () => pages.value.find((page) => page.name === name).selectedTab
);

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();

  breadcrumbStore.pushItem({
    title: "Serviços",
    disabled: true,
    href: "/services",
  });
});

definePageMeta({
  middleware: ['auth']
})
</script>
