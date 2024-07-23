import axios from 'axios';

export const useCounterStore = defineStore('', {
  state: () => ({ count: 0, name: 'qualquer nome', cats: [] }),

  getters: {
    tripleCount: (state) => state.count * 3,
  },

  actions: {
    increment() {
      this.count++;
    },

    async getCats() {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          headers:{
            'x-api-key': 'live_yLwPotTK1u3Y0Cy8Rit0eThb9BfmoBtF0clHmDixl0plxKC5sQ7QYBKJY3J9pbSn',
        },
      });

      this.cats = response.data;
    },
  },
});

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0);
//   const name = ref('Eduardo');

//   const tripleCount = computed(() => count.value * 3);
  
//   function increment() {
//     count.value++;
//   }

//   return { count, name, tripleCount, increment };
// });