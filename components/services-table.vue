<template>
  <v-data-table :headers="headers" :items="services">
    <template v-slot:item.actions="{ item }">
      <NuxtLink :to="{ name: 'services-id', params: { id: item.id } }">
        <v-icon class="me-2" size="small">
          mdi-eye-outline
        </v-icon>
      </NuxtLink>
    </template>
  </v-data-table>
</template>

<script setup>
import { useServiceStore } from "@/stores/service";

const headers = ref([
  { title: "ID", value: "id" },
  { title: "Nome", value: "name" },
  { title: "Valor total", value: "totalValue" },
  { title: "Margem bruta estimada", value: "grossMargin" },
  { title: "Valor empreendido", value: "spentValue" },
  { title: "Status", value: "serviceStatus" },
  { title: "Ações", value: "actions" },
]);

const serviceStore = useServiceStore();
const { services } = storeToRefs(serviceStore);

onMounted(() => {
  serviceStore.fetchServices();
});
</script>
