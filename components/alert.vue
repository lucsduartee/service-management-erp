<template>
  <v-alert
    class="mt-10"
    v-model="props.alert"
    border="start"
    close-label="Close Alert"
    :color="'red'"
    :title="props.title"
    variant="tonal"
    closable
  >
    {{ props.content }}
  </v-alert>
</template>

<script setup>
const props = defineProps(['alert', 'title', 'content']);
</script>













