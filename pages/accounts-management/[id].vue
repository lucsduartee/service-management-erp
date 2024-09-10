<template>
  <v-container>
    <breadcrumb />

    <h1 class="my-7 text-2xl">Usuário {{ route.params.id }}</h1>

    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="userFormData.name" label="Nome" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="userFormData.email" label="Email" />
        </v-col>
      </v-row>
      <v-btn type="submit">Salvar</v-btn>
    </v-form>

    <v-spacer></v-spacer>

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
  </v-container>
</template>

<script setup>
import { useBreadcrumbStore } from "@/stores/breadcrumb";

const route = useRoute();
const breadcrumbStore = useBreadcrumbStore();

const userFormData = reactive({
  name: "John Doe",
  email: "john@gmail.com",
});
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
  alertContent.title = "Usuário atualizado com sucesso";
  alertContent.text = "";
  alertContent.color = "green-accent-4";
};

const submit = async () => {
  alert.value = false;

  try {
    const user = await $fetch("/api/user", {
      method: "PUT",
      body: {
        user: userFormData,
      },
    });

    if (user) {
      setSuccessAlertContent();
      alert.value = true;
    }
  } catch (e) {
    setErrorAlertContent();
    alert.value = true;
  }
};

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();

  breadcrumbStore.pushItem(
    {
      title: "Gerenciador de usuários",
      disabled: false,
      href: "/accounts-management",
    },
    {
      title: `${route.params.id}`,
      disabled: true,
      href: `/accounts-management/${route.params.id}`,
    }
  );
});
</script>
