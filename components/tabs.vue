<script setup lang="ts">
const tab = ref(null);
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="dark">
      <v-tab :value="1">Cadastrar Obra</v-tab>
      <v-tab :value="2">Listar</v-tab>
    </v-tabs>
  </v-card>
</template>