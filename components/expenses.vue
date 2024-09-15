<template>
  <v-card class="my-5">
    <v-card-title class="text-h5 font-weight-bold">Despesas</v-card-title>
    <v-col>
      <v-alert
        class="mb-4"
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
                <v-row>
                  <v-col cols="9">
                    <v-text-field
                      v-model="paymentName"
                      :label="`${paymentsName.length} boletos adicionados`"
                      placeholder="Ex.: Boleto - DD/MM/AAAA"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-btn @click.prevent="addPaymentName(paymentName)"
                      >Adicionar boleto</v-btn
                    >
                  </v-col>
                </v-row>
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
                <v-col class="d-flex justify-start">{{ expense.name }}</v-col>
                <v-col class="text-grey">
                  {{ expense.type }}
                </v-col>

                <v-col class="text-grey">
                  {{ expense.value }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-checkbox
              v-for="(payment, index) in expense.payments"
              :key="index"
              v-model="payment.status"
              density="compact"
              :label="payment.name"
            ></v-checkbox>
            <NuxtLink
              :to="`${config.public.SERVICES_API_HOST}/assets/${expense.file}?download`"
              :donwload="expense.filename_download"
              target="_blank"
              external
            >
              <v-btn class="mr-3"> Ver nota fiscal </v-btn>
            </NuxtLink>
            <v-btn @click.prevent="addPayment(expense.id, expense.payments)"
              >Contabilizar pagamento</v-btn
            >
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-card>
</template>

<script setup>
const { getItems, createItems, updateItem } = useDirectusItems();

const config = useRuntimeConfig();
const { token } = useDirectusToken();

const emit = defineEmits();
const category = ref();
const name = ref();
const value = ref();
const file = ref();
const paymentsName = ref([]);
const paymentName = ref("");
const total_payments = ref();
const formData = reactive(new FormData());
const alertExpense = ref(false);

const route = useRoute();

const expenses = ref([]);

const expensesSum = computed(() => {
  return expenses.value.reduce((acc, { value }) => Number(value) + acc, 0);
});

const createFormData = (expense_id) => {
  const params = {
    title: name.value,
    file: file.value,
    type: "application/pdf",
    expense_id: expense_id,
  };

  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
};

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
  paymentsName.value = [];


  formData.forEach((_, key) => {
    formData.delete(key);
  });
};

const createExpense = async () => {
  const items = [
    {
      category: category.value,
      name: name.value,
      value: value.value,
      total_payments: total_payments.value,
      services_id: route.params.id,
    },
  ];

  const expense = await createItems({
    collection: "expenses",
    items,
  });

  return expense[0];
};

function addPaymentName(name) {
  paymentsName.value.push(name);
  paymentName.value = "";
}

async function addExpense() {
  alertExpense.value = false;

  try {
    const expense = await createExpense();

    if (expense) {
      createFormData(expense.id);

      const createdPayments = await Promise.all(
        paymentsName.value.map(async (itemName) => {
          return await createItems({
            collection: "payments",
            items: [{ name: itemName, expense_id: expense.id }],
          });
        })
      );

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
        collection: "expenses",
        id: expense.id,
        item: {
          file: file.id,
        },
      });

      expenses.value.push({
        id: expense.id,
        name: expense.name,
        category: expense.category,
        total_payments: expense.total_payments,
        payments_count: expense.payments_count,
        value: expense.value,
        payments: createdPayments.flat(),
        filename_download: file.filename_download,
        file: file_id,
      });

      emit("expense-value", expensesSum);
      setSuccessExpenseAlertContent();
      alertExpense.value = true;
      resetFormData();
    }
  } catch (e) {
    setErrorExpenseAlertContent(e);
    resetFormData();
    alertExpense.value = true;
  }
}

async function addPayment(expenseId, payments) {
  try {
    const expense = expenses.value.find((expense) => expense.id === expenseId);

    const { payments_count } = await updateItem({
      collection: "expenses",
      id: expenseId,
      item: {
        payments_count: expense.payments_count + 1,
      },
    });

    payments.forEach(
      async (payment) =>
        await updateItem({
          collection: "payments",
          id: payment.id,
          item: {
            status: payment.status,
          },
        })
    );

    expenses.value = expenses.value.map((expense) =>
      expense.id === expenseId ? { ...expense, payments_count } : expense
    );
  } catch (e) {}
}

onMounted(async () => {
  try {
    const item = await getItems({
      collection: "services",
      params: {
        filter: { id: route.params.id },
      },
    });

    const fetchedExpenses = await Promise.all(
      item[0].expenses.map(async (id) => {
        return await getItems({
          collection: "expenses",
          params: {
            filter: { id: id },
            fields: "*,payments.*",
          },
        });
      })
    );

    const fetchedExpensesItems = fetchedExpenses.map(([item]) => item);
    expenses.value = [...expenses.value, ...fetchedExpensesItems];

    emit("expense-value", expensesSum);
  } catch (e) {
    setErrorExpenseAlertContent(e);
    alertExpense.value = true;
  }
});
</script>
