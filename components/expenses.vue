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
                <v-text-field v-model="value" label="Valor"></v-text-field>
                <v-select
                  v-model="type"
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
            <v-btn class="mr-3">Ver nota fiscal</v-btn>
            <v-btn>Deletar despesa</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-card>
</template>

<script setup>
const type = ref();
const name = ref();
const value = ref();
const file = ref();
const formData = reactive(new FormData());

const expenses = ref([]);

const createFormData = () => {
  const params = {
    type: type.value,
    name: name.value,
    value: value.value,
    file: file.value,
  };

  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
};

const alertExpense = ref(false);

const alertExpenseContent = reactive({
  title: "",
  color: "",
  text: "",
});

const setErrorExpenseAlertContent = () => {
  alertExpenseContent.title = "Ocorreu um erro";
  alertExpenseContent.text = "Tente novamente mais tarde";
  alertExpenseContent.color = "red-accent-4";
};

const setSuccessExpenseAlertContent = () => {
  alertExpenseContent.title = "Usuário atualizado com sucesso";
  alertExpenseContent.text = "";
  alertExpenseContent.color = "green-accent-4";
};

const resetFormData = () => {
  type.value = '';
  name.value = '';
  value.value = '';
  file.value = {};

  formData.forEach((_, key) => {
    formData.delete(key);
  });
}

async function addExpense() {
  alertExpense.value = false;
  createFormData();

  try {
    const response = await $fetch("/api/expense", {
      method: "post",
      body: formData,
    });

    if (response.data.expense) {
      expenses.value.push({ id: expenses.value.length, name: name.value, type: type.value, value: value.value });
      setSuccessExpenseAlertContent();
      alertExpense.value = true;
      resetFormData();
    }
  } catch (e) {
    console.log('eee', e)
    setErrorExpenseAlertContent();
    alertExpense.value = true;
  }
}
</script>
