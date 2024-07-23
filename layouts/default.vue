<template>
  <div class="container mx-auto h-screen flex flex-row gap-3 py-3">
    <sidebar />
    <v-main class="main">
      <slot />
    </v-main>
  </div>
</template>

<style scoped>
  .main {
    flex: auto
  }
</style>