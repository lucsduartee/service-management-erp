- Layouts e Páginas

Entrypoint é app.vue

Abarcar a aplicação com `<NuxtLayout />` e `<NuxtPage />`

Criar diretório pages
  - cada pasta representa uma composição do path
  - [:param].vue.. o :param é pode ser acessado por const route = useRoute();
  - index.vue sempre aponta pra um base `/`

Criar diretório Layouts/defaults.vue

---
- Estilo

```vue
<template>
<div class="class">
  // elementos
</div>
</template>

<style>
  .class {
    
    // estilos

  }
</style>
```
---
- Estado e reatividade

Options API

```vue

<template>
  <div>
    <p>{{ state }}</p>

    <p>{{ anotherState.key }}</p>

    <p>{{ finalValue }}</p>

    <button @click='logStateValue'>'Log'</button>
    <button @click='changeAnotherStateKey'>'Change'</button>
  </div>
</template>

<script>
  export default {
    name: 'ComponentName',
    props: {
      // ...
    },
    data() {
      return {
        state: 'value',
        anotherState: {
          key: 'anotherStateValue',
        },
      },
    }
    methods: {
      logStateValue() {
        console.log(this.state);
      },
      changeAnotherStateKey() {
        this.anotherState = { ...this.anotherState, key: 'valueChanged' }
      },
    },
    computed: {
      finalValue() {
        return this.anotherState.key + 'secondValue';
      },
    },
  }
</script>
```
---
Composition API

```vue
<template>
  <div>
    <p>{{ state }}</p>

    <p>{{ anotherState.key }}</p>

    <p>{{ finalValue }}</p>

    <button @click='logStateValue'>'Log'</button>
    <button @click='changeAnotherStateKey'>'Change'</button>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';

export default {
  setup() {
    const state = ref('value');

    function logStateValue() {
      console.log(state.value);
    }

    const anotherState = reactive({
      key: 'anotherStateValue',
    });

    function changeAnotherStateKey() {
      this.anotherState = { ...this.anotherState, key: 'valueChanged' }
    }

    const finalValue = computed(() => {
      return this.anotherState.key + 'secondValue';
    });

    return {
      state,
      logStateValue,
      anotherState,
      finalValue,
    };
  },
};
</script>
```
---
- Requisição

Em poucas palavras

- `useFetch`: manusear requisições na montagem do componente
- `$fetch`: requisições baseadas na interação do usuário
- `useAsyncData`: pode ser combinado com o `$fetch` para um maior controle

---
useFetch

```vue
<script>
  import { useFetch } from 'vue';

  export default {
    setup() {
      const { data: content } = await useFetch('api/content');

      return {
        content
      }
    }
  }
</script>

<template>
  <p>{{content}}</p>
</template>
```
---

$fetch

```vue
<script>
  export default {
    setup() {
      async function addContent() {
        const res = await fetch('api/content', {
          method: 'POST',
          body: {},
        });
      }
    
      return {
        addContent,
      }
    }
  }
</script>
```
---
useAsyncData

```vue
<script>
  export default {
    setup() {
      async function addContent() {
        const { data } = await useAsyncData('key', async () => {
          const [resource1, resource2] = await Promise.all([
            fetch('/api/resource1'),
            fetch('/api/resource2')
          ]);

          return { resource1, resource2 }
        });

        // data.value.resource1
        // data.value.resource2
      }
    
      return {
        addContent,
      }
    }
  }
</script>
```

```vue
<script>
  import { useRoute } from vue;

  const { id } = useRoute().params;

  export default {
    setup() {
      async function addContent() {
        const { data } = await useAsyncDate(`resource:#{id}`, () => {
          return getResourse('resourse', { id })
        })
        return {}
      }

      return { addContent }
    }
  }
</script>
```
Return values https://nuxt.com/docs/getting-started/data-fetching#return-values

Rotas

POST pra cadastro de serviço
GET pra listar serviço
GET pra listar orçamento
POST pra adicionar orçamento
GET pra trazer serviço específico
PUT pra editar o serviço
POST pra criar uma despesa
GET pra trazer despesas

