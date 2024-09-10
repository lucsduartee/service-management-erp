<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="name" label="Nome"></v-text-field>

    <v-text-field v-model="description" label="Breve descrição"></v-text-field>

    <v-text-field
      v-model.number="cost"
      label="Valor total disponibilizado"
    ></v-text-field>

    <v-btn type="submit">Cadastrar</v-btn>

    <v-alert
      class="mt-10"
      v-model="alert"
      border="start"
      close-label="Close Alert"
      :color="alertContent.color"
      :title="alertContent.title"
      variant="tonal"
      closable
    >
      {{ alertContent.text }}
    </v-alert>
  </v-form>
</template>

<script setup>
import { useServiceStore } from "@/stores/service";
const { createItems } = useDirectusItems();

const serviceStore = useServiceStore();
const { services } = storeToRefs(serviceStore);

const name = ref("");
const description = ref("");
const cost = ref("");
const alert = ref(false);

const alertContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorAlertContent = (message) => {
  alertContent.title = "Ocorreu um erro";
  alertContent.text = message;
  alertContent.color = "red-accent-4";
};

const setSuccessAlertContent = () => {
  alertContent.title = "Seviço criado com sucesso";
  alertContent.text = "";
  alertContent.color = "green-accent-4";
};

const resetForms = () => {
  name.value = "";
  description.value = null;
  cost.value = null;
};

const submit = async () => {
  alert.value = false;

  try {
    const response = await createItems({
      collection: "services",
      items: [
        {
          name: name.value,
          description: description.value,
          cost: cost.value,
        },
      ],
    });

    if (response[0]) {
      services.value.push(response[0]);
      setSuccessAlertContent();
      alert.value = true;
      resetForms();
    }
  } catch (e) {
    setErrorAlertContent(e?.data?.message);
    alert.value = true;
  }
};
</script>