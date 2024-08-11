<template>
  <v-container>
    <breadcrumb />

    <h1 class="my-7 text-2xl">Serviço {{ route.params.id }}</h1>

    <budgets />

    <expenses />

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Informações</v-card-title>
          <v-col>
            <v-alert
              v-model="alertService"
              border="start"
              close-label="Close Alert"
              :color="alertServiceContent.color"
              :title="alertServiceContent.title"
              variant="tonal"
              closable
            >
              {{ alertServiceContent.text }}
            </v-alert>
          </v-col>

          <v-col>
            <v-text-field
              label="Nome do serviço"
              v-model="service.name"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Total disponibilizado"
              v-model="service.totalValue"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Total gasto"
              v-model="service.spentValue"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Margem bruta prevista"
              v-model="service.grossMargin"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Total em despesas"
              v-model="grossMargin"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              label="Status"
              :items="['Em orçamento', 'Em andamento', 'Finalizado']"
              v-model="service.serviceStatus"
            ></v-select>
          </v-col>

          <v-card-actions>
            <v-btn @click.prevent="editService" block>Salvar alterações</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useBreadcrumbStore } from "@/stores/breadcrumb";

const grossMargin = ref();

const route = useRoute();
const service = ref({
  id: 1,
  name: "Obra número 1",
  totalValue: 1000,
  spentValue: 200,
  grossMargin: 500,
  serviceStatus: "Em orçamento",
});

const breadcrumbStore = useBreadcrumbStore();

const alertService = ref(false);

const alertServiceContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorServiceAlertContent = () => {
  alertServiceContent.title = "Ocorreu um erro";
  alertServiceContent.text = "Tente novamente mais tarde";
  alertServiceContent.color = "red-accent-4";
};

const setSuccessServiceAlertContent = () => {
  alertServiceContent.title = "Usuário atualizado com sucesso";
  alertServiceContent.text = "";
  alertServiceContent.color = "green-accent-4";
};

async function editService() {
  alertService.value = false;

  try {
    const response = await $fetch("/api/service", {
      method: "put",
      body: {
        grossMargin,
        serviceStatus: service.value.serviceStatus,
      },
    });

    if (response.data.service) {
      setSuccessServiceAlertContent();
      alertService.value = true;
    }
  } catch (e) {
    setErrorServiceAlertContent();
    alertService.value = true;
  }
}

onMounted(() => {
  breadcrumbStore.setInitialBreadcrumb();

  breadcrumbStore.pushItem(
    {
      title: "Serviços",
      disabled: false,
      href: "/services",
    },
    {
      title: `${route.params.id}`,
      disabled: true,
      href: `/services/${route.params.id}`,
    }
  );
});
</script>
