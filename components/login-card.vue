<template>
  <v-card>
    <v-container>
      <v-card-title> Login </v-card-title>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="email" label="Email"></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          label="Senha"
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
    </v-container>
  </v-card>
</template>

<script setup>
const { login } = useDirectusAuth();

const email = ref("");
const password = ref("");

const alert = ref(false);

const alertContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorServiceAlertContent = (message) => {
  alertContent.title = "Ocorreu um erro";
  alertContent.text = message;
  alertContent.color = "red-accent-4";
};

const submit = async () => {
  alert.value = false;

  try {
    const response = await login({ email: email.value, password: password.value });

    console.log("response", response);
  } catch (e) {
    setErrorServiceAlertContent(e);
    alert.value = true;
  }
};
</script>
