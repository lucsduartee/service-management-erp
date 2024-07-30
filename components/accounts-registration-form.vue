<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field v-model="name" label="Nome"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="Senha"></v-text-field>
      </v-col>
      <v-col>
        <v-select
          label="Permissão"
          :items="['Administrador', 'Usuário']"
          v-model="permission"
        ></v-select>
      </v-col>
    </v-row>
    <v-btn>Cadastrar</v-btn>
  </v-form>
</template>

<script>
const name = ref("");
const email = ref("");
const password = ref("");
const permission = ref("");
</script>