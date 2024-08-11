<template>
  <v-breadcrumbs :items="breadcrumb"></v-breadcrumbs>
</template>

<script setup>
import { useBreadcrumbStore } from "@/stores/breadcrumb";

const breadcrumbStore = useBreadcrumbStore();
const { breadcrumb } = storeToRefs(breadcrumbStore);
</script>
