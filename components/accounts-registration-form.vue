<template>
  <v-form @submit.prevent="submit">
    <v-row>
      <v-col>
        <v-text-field label="Nome" v-model="name" required></v-text-field>

        <v-text-field v-model="email" label="Email" type="email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-select
          label="Permissão"
          :items="['Administrador', 'Usuário']"
          v-model="permission"
        ></v-select>
      </v-col>
    </v-row>
    <v-btn type="submit"> Cadastrar </v-btn>

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
const name = ref("");
const email = ref("");
const password = ref("");
const permission = ref("");

const alert = ref(false);

const alertContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorAlertContent = () => {
  alertContent.title = "Ocorreu um erro";
  alertContent.text = "Tente novamente mais tarde";
  alertContent.color = "red-accent-4";
};

const setSuccessAlertContent = () => {
  alertContent.title = "Usuário criado com sucesso";
  alertContent.text = "";
  alertContent.color = "green-accent-4";
};

const resetForms = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  permission.value = "";
};

const submit = async () => {
  alert.value = false;

  try {
    const user = await $fetch("/api/user", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        permission: permission.value,
      },
    });

    if (user) {
      setSuccessAlertContent();
      alert.value = true;
      resetForms();
    }
  } catch (e) {
    setErrorAlertContent();
    alert.value = true;
  }
};

definePageMeta({
  middleware: ['auth']
})
</script>