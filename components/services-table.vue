<template>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:top>
      <v-dialog>
        <v-card>
          <v-card-title>{{ "Blaa" }}</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field label="Nome"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Cancelar</v-btn>
            <v-btn>Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-eye-outline
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
const headers = ref([
  { title: "ID", value: "id" },
  { title: "Nome", value: "name" },
  { title: "Valor total", value: "totalValue" },
  { title: "Margem bruta estimada", value: "grossMargin" },
  { title: "Valor empreendido", value: "spentValue" },
  { title: "Status", value: "serviceStatus" },
  { title: "Ações", value: "actions" },
]);
const items = ref([]);

onMounted(() => {
  items.value = [
    {
      id: 1,
      name: "Obra número 1",
      totalValue: 1000,
      spentValue: 200,
      grossMargin: 500,
      serviceStatus: "Em orçamento",
    },
    {
      id: 2,
      name: "Obra número 2",
      totalValue: 2000,
      spentValue: 700,
      grossMargin: 1000,
      serviceStatus: "Aguardando aprovação",
    },
    {
      id: 3,
      name: "Obra número 3",
      totalValue: 3000,
      spentValue: 1500,
      grossMargin: 2000,
      serviceStatus: "Em andamento",
    },
    {
      id: 4,
      name: "Obra número 4",
      totalValue: 4000,
      spentValue: 2800,
      grossMargin: 3000,
      serviceStatus: "Reprovado",
    },
    {
      id: 5,
      name: "Obra número 5",
      totalValue: 5000,
      spentValue: 3200,
      grossMargin: 4000,
      serviceStatus: "Finalzado",
    },
  ];
});
</script>
