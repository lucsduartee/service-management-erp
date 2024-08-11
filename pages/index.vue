<template>
  <div>
    <h1 class="mb-8 text-2xl">Bem vindo ao seu painel de gestão</h1>
    <breadcrumb />
  </div>
</template>

<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumb';

const breadcrumbStore = useBreadcrumbStore();

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();
});
</script>
