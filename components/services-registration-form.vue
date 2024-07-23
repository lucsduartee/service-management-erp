<template>
  <v-form>
    <v-text-field
      v-model="name"
      label="Nome"
    ></v-text-field>
    <v-text-field
      v-model="totalPrice"
      label="Nome"
    ></v-text-field>

    <v-btn>Cadastrar</v-btn>
  </v-form>
</template>

<script setup lang="ts">
  const name = ref('');
  const totalPrice = ref('');
</script>