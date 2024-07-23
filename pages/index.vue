<template>
  <div>
    <h1>Welcome to the homepage</h1>

    <p> Nome: {{counterStore.name}}</p>

    <p> Contador: {{counterStore.tripleCount}}</p>

    <button @click="counterStore.increment">Increment</button>

    <img :src="cats[0]?.url" />
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

const { cats } = storeToRefs(counterStore);

onMounted(() => {
  // counterStore.getCats();
});
</script>
