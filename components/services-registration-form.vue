<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="name" label="Nome"></v-text-field>
    <v-text-field
      v-model="totalPrice"
      type="number"
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
      'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
      {{ alertContent.text }}
    </v-alert>
  </v-form>
</template>

<script setup>
const name = ref("");
const totalPrice = ref("");
const alert = ref(false);

const alertContent = reactive({
  title: '',
  color: '',
  text: '',
})

const setErrorAlertContent = () => {
  alertContent.title = 'Ocorreu um erro';
  alertContent.text = 'Tente novamente mais tarde';
  alertContent.color = 'red-accent-4';
};

const setSuccessAlertContent = () => {
  alertContent.title = 'Seviço criado com sucesso';
  alertContent.text = '';
  alertContent.color = 'green-accent-4';
}

const resetForms = () => {
  name.value = '';
  totalPrice.value = null
}

const submit = async () => {
  alert.value = false;

  try {
    const service = await $fetch("/api/service", {
      method: "POST",
      body: {
        name: name.value,
        totalPrice: totalPrice.value,
      },
    });

    if (service) {
      setSuccessAlertContent();
      alert.value = true;
      resetForms();
    }
  } catch (e) {
    setErrorAlertContent();
    alert.value = true;
  }
};
</script>