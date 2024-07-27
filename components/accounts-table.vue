<template>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:top>
      <v-dialog>
        <v-card>
          <v-card-title>{{ 'Blé' }}</v-card-title>
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
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
  const headers = ref([
    { title: 'ID', value: 'id' },
    { title: 'Nome', value: 'name' },
    { title: 'Email', value: 'email' },
    { title: 'Ações', value: 'actions' },
  ]);

  const items = ref([]);

  onMounted(() => {
    items.value = [
      { id: 1, name: 'João', email: 'joao@gmail.com' },
      { id: 2, name: 'Maria', email: 'maria@gmail.com' },
    ];
  });
</script>