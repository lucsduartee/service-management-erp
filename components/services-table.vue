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
  { title: "Custo", value: "cost" },
  { title: "Margem bruta estimada", value: "gross_margin" },
  { title: "Valor empreendido", value: "spent_value" },
  { title: "Status", value: "status" },
  { title: "Ações", value: "actions" },
]);

const serviceStore = useServiceStore();
const { services } = storeToRefs(serviceStore);

onMounted(() => {
  serviceStore.fetchServices();
});
</script>
