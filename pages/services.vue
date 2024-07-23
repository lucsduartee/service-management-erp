<template>
  <div>
    <h1 class="mb-10">
      Serviços
    </h1>

    <Tabs :tab-options="tabOptions"/>

    <services-registration-form />

    <v-divider class="my-10" />

    <services-table />
</div>
</template>

<script setup lang="ts">
const tabOptions = ref(['Tab 1', 'Tab 2', 'Tab 3']);
</script>
