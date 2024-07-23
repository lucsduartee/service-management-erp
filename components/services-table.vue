<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:top>
      <v-dialog>
        <v-card>
          <v-card-title>{{ 'Blaa' }}</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
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
  </v-data-table>
</template>

<script setup lang="ts">
const headers = ref([
  { title: 'ID', value: 'id'},
  { title: 'Nome', value: 'name'},
  { title: 'Valor total', value: 'totalValue'},
  { title: 'Valor empreendido', value: 'spentValue'},
  { title: 'Status', value: 'serviceStatus'},
  { title: 'Ações', value: 'actions'},
])
const items = ref([
  {
    id: 1,
    name: "T-Shirt",
    totalValue: "M",
    spentValue: "Red",
    serviceStatus: 19.99,
    actions: 10,
  },
  {
    id: 2,
    name: "T-Shirt",
    totalValue: "M",
    spentValue: "Red",
    serviceStatus: 19.99,
    actions: 10,
  },
  {
    id: 3,
    name: "T-Shirt",
    totalValue: "M",
    spentValue: "Red",
    serviceStatus: 19.99,
    actions: 10,
  },
  {
    id: 4,
    name: "T-Shirt",
    totalValue: "M",
    spentValue: "Red",
    serviceStatus: 19.99,
    actions: 10,
  },
  {
    id: 5,
    name: "T-Shirt",
    totalValue: "M",
    spentValue: "Red",
    serviceStatus: 19.99,
    actions: 10,
  },
]);
</script>
