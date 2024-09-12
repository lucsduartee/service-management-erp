<template>
  <div>
    <login-card v-if="!user"/>
    <div v-else>
      <h1 class="mb-8 text-h5 font-weight-bold">Bem vindo ao seu painel de gestão</h1>
      <breadcrumb />
    </div>
  </div>
</template>

<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumb';
const user = useDirectusUser();

const breadcrumbStore = useBreadcrumbStore();

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();
});
</script>
