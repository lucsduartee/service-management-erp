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
              v-model="service.cost"
              readonly
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Margem bruta prevista"
              v-model="service.gross_margin"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Total em despesas"
              v-model="service.spent_value"
              readonly
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
import { useServiceStore } from "@/stores/service";

const serviceStore = useServiceStore();
const grossMargin = ref();

const route = useRoute();
const service = ref({});

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
    const response = await $fetch(
      `http://localhost:3001/api/service/${route.params.id}`,
      {
        method: "put",
        body: {
          grossMargin,
          serviceStatus: service.value.serviceStatus,
        },
      }
    );

    if (response.data.service) {
      setSuccessServiceAlertContent();
      alertService.value = true;
    }
  } catch (e) {
    setErrorServiceAlertContent();
    alertService.value = true;
  }
}

onMounted(async () => {
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

  service.value = await serviceStore.fetchService(route.params.id);
});
</script>
