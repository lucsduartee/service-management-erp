<template>
  <v-container>
    <v-card>
      <v-card-title>Informações do usuário</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.name" label="Nome" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="user.email" label="Email" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn>Cancelar</v-btn>
        <v-btn>Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
const { id } = useRoute().params;

const user = ref({
  name: 'John Doe',
  email: 'john@gmail.com',
});
</script>
