<template>
  <v-card class="my-5">
    <v-card-title>Despesas</v-card-title>
    <v-col>
      <v-alert
        v-model="alertExpense"
        border="start"
        close-label="Close Alert"
        :color="alertExpenseContent.color"
        :title="alertExpenseContent.title"
        variant="tonal"
        closable
      >
        {{ alertExpenseContent.text }}
      </v-alert>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">
                  Adicionar despesa
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
                <v-text-field
                  v-model="value"
                  type="number"
                  label="Valor"
                ></v-text-field>
                <v-text-field
                  v-model="total_payments"
                  label="Quantidade de pagamentos"
                ></v-text-field>
                <v-select
                  v-model="category"
                  label="Tipo da despesa"
                  :items="['Mão de obra', 'Equipamento', 'Material', 'Outros']"
                ></v-select>
                <v-file-input
                  v-model="file"
                  label="Anexar nota fiscal"
                ></v-file-input>
                <v-btn block @click.prevent="addExpense">Adicionar</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col>
      <v-expansion-panels>
        <v-expansion-panel v-for="(expense, index) in expenses" :key="index">
          <v-expansion-panel-title>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">{{
                  expense.name
                }}</v-col>
                <v-col class="text-grey" cols="4">
                  {{ expense.type }}
                </v-col>

                <v-col class="text-grey" cols="4">
                  {{ expense.value }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-btn @click.prevent="downloadNotaFiscal(expense.id)" class="mr-3"
              >Ver nota fiscal</v-btn
            >
            <v-btn>Deletar despesa</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-card>
</template>

<script setup>
const emit = defineEmits();
const category = ref();
const name = ref();
const value = ref();
const file = ref();
const total_payments = ref();
const formData = reactive(new FormData());

const route = useRoute();

const expenses = ref([]);

const expensesSum = computed(() => {
  return expenses.value.reduce((acc, { value }) => Number(value) + acc, 0);
});

const createFormData = () => {
  const params = {
    category: category.value,
    name: name.value,
    value: value.value,
    total_payments: total_payments.value,
    service_id: route.params.id,
    file: file.value,
  };

  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
};

const downloadNotaFiscal = async (id) => {
  alertExpense.value = false;

  try {
    const downloadLink = await $fetch(
      `${$config.public.SERVICES_API_HOST}/expenses/${id}/download_nota_fiscal`,
      {
        method: "get",
      }
    );

    if (downloadLink) {
      await navigateTo(`${downloadLink}`, {
        external: true,
        open: {
          target: "_blank",
        },
      });

      return;
    }
  } catch (e) {
    setErrorExpenseAlertContent(e.data.message);
    alertExpense.value = true;
  }
};

const alertExpense = ref(false);

const alertExpenseContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorExpenseAlertContent = (message) => {
  alertExpenseContent.title = "Ocorreu um erro";
  alertExpenseContent.text = message;
  alertExpenseContent.color = "red-accent-4";
};

const setSuccessExpenseAlertContent = () => {
  alertExpenseContent.title = "Despesa criada com sucesso";
  alertExpenseContent.text = "";
  alertExpenseContent.color = "green-accent-4";
};

const resetFormData = () => {
  category.value = "";
  name.value = "";
  value.value = null;
  total_payments.value = null;
  file.value = {};

  formData.forEach((_, key) => {
    formData.delete(key);
  });
};

async function addExpense() {
  alertExpense.value = false;
  createFormData();

  try {
    const response = await $fetch(`${$config.public.SERVICES_API_HOST}/expenses`, {
      method: "post",
      body: formData,
    });

    if (response.expense) {
      const { expense } = response;
      expenses.value.push({
        id: expense.id,
        name: expense.name,
        category: expense.category,
        value: expense.value,
      });
      emit("expense-value", expensesSum);
      setSuccessExpenseAlertContent();
      alertExpense.value = true;
      resetFormData();
    }
  } catch (e) {
    setErrorExpenseAlertContent(e.data.message);
    alertExpense.value = true;
  }
}

onMounted(async () => {
  try {
    const response = await $fetch(
      `${$config.public.SERVICES_API_HOST}/services/${route.params.id}/expenses`,
      {
        method: "get",
      }
    );

    expenses.value = response.expenses;
    emit("expense-value", expensesSum);
  } catch (e) {
    setErrorExpenseAlertContent(e.data.message);
    alertExpense.value = true;
  }
});
</script>
