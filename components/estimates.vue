<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">Orçamentos</v-card-title>
    <v-col>
      <v-alert
        v-model="alertEstimates"
        border="start"
        close-label="Close Alert"
        :color="alertEstimateContent.color"
        :title="alertEstimateContent.title"
        variant="tonal"
        closable
      >
        {{ alertEstimateContent.text }}
      </v-alert>
      <v-card-item
        class="d-flex align-center justify-space-between"
        v-for="(item, index) in estimates"
        :key="index"
      >
        <b>Orçamento:</b> {{ item.name }} - <b>Valor:</b> {{ item.value }}
        <NuxtLink
          :to="`${config.public.SERVICES_API_HOST}/assets/${item.file}?download`"
          :donwload="item.filename_download"
          target="_blank"
          external
        >
          <v-btn variant="plain" density="compact" class="mr-3"
            >Ver</v-btn
          >
        </NuxtLink>
      </v-card-item>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">
                  Adicionar orçamento
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  label="Nome de referência"
                ></v-text-field>
                <v-text-field v-model="value" label="Valor"></v-text-field>
                <v-file-input
                  v-model="file"
                  label="Anexar orçamento"
                ></v-file-input>
                <v-btn @click="addEstimate" block>Adicionar</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-card>
</template>

<script setup>
const { updateItem, getItems, createItems } = useDirectusItems();
const { token } = useDirectusToken();

const config = useRuntimeConfig();
const route = useRoute();

const name = ref();
const file = ref();
const value = ref();
const formData = reactive(new FormData());
const alertEstimates = ref(false);
const alertEstimateContent = reactive({
  title: "",
  color: "",
  text: "",
});

const estimates = ref([]);

const createFormData = (estimate_id) => {
  const params = {
    title: name.value,
    file: file.value,
    type: "application/pdf",
    estimate_id: estimate_id,
  };

  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
};

const resetFormData = () => {
  name.value = "";
  value.value = "";
  file.value = {};

  formData.forEach((_, key) => {
    formData.delete(key);
  });
};

const setErrorEstimateAlertContent = (e) => {
  alertEstimateContent.title = "Ocorreu um erro";
  alertEstimateContent.text = e;
  alertEstimateContent.color = "red-accent-4";
};

const setSuccessEstimateAlertContent = () => {
  alertEstimateContent.title = "Orçamento criado";
  alertEstimateContent.text = "";
  alertEstimateContent.color = "green-accent-4";
};

const createEstimate = async () => {
  const items = [
    {
      name: name.value,
      value: value.value,
      services_id: route.params.id,
    },
  ];

  const estimate = await createItems({ collection: "estimates", items });

  return estimate[0];
};

async function addEstimate() {
  alertEstimates.value = false;

  try {
    const estimate = await createEstimate();

    if (estimate) {
      createFormData(estimate.id);

      const { data: file } = await $fetch(
        `${config.public.SERVICES_API_HOST}/files`,
        {
          method: "post",
          body: formData,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      const { file: file_id } = await updateItem({
        collection: "estimates",
        id: estimate.id,
        item: {
          file: file.id,
        },
        params: {
          fields: ["*"],
        },
      });

      estimates.value.push({
        id: estimate.id,
        name: estimate.name,
        value: estimate.value,
        filename_download: file.filename_download,
        file: file_id,
      });

      setSuccessEstimateAlertContent();
      alertEstimates.value = true;
      resetFormData();
    }
  } catch (e) {
    setErrorEstimateAlertContent(e);
    resetFormData();
    alertEstimates.value = true;
  }
}

onMounted(async () => {
  try {
    const item = await getItems({
      collection: "services",
      params: {
        filter: { id: route.params.id },
      },
    });

    const fetchedEstimates = await Promise.all(
      item[0].estimates.map(async (id) => {
        return await getItems({
          collection: "estimates",
          params: {
            filter: { id: id },
          },
        });
      })
    );

    const fetchedEstimatesItems = fetchedEstimates.map(([item]) => item);
    estimates.value = [...estimates.value, ...fetchedEstimatesItems];
  } catch (e) {
    setErrorEstimateAlertContent(e);
    alertEstimates.value = true;
  }
});
</script>