<script setup>
import { useTabsStore } from "@/stores/tabs";

const tabsStore = useTabsStore();
const { pages } = storeToRefs(tabsStore);
const { name } = useRoute();
const { selectTab } = tabsStore;
const tab = ref(null);

const tabs = computed(() => pages.value.find(page => page.name === name));
</script>

<template>
  <v-card>
    <client-only>
      <v-tabs v-model="tab" bg-color="dark">
        <v-tab @click="selectTab(name, tab)" value="createService">
          Cadastrar Obra
        </v-tab>
        <v-tab @click="selectTab(name, tab)" value="listService">
          Listar
        </v-tab>
      </v-tabs>
    </client-only>
  </v-card>
</template>