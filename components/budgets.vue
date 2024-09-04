<template>
  <v-card>
    <v-card-title>Orçamentos</v-card-title>
    <v-col>
      <v-alert
        v-model="alertBudget"
        border="start"
        close-label="Close Alert"
        :color="alertBudgetContent.color"
        :title="alertBudgetContent.title"
        variant="tonal"
        closable
      >
        {{ alertBudgetContent.text }}
      </v-alert>
      <v-card-item v-for="(item, index) in budgets" :key="index">
        Orçamento: {{ item.name }} - Valor: {{ item.value }}
      </v-card-item>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">
                  Adicionar orçamento
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
                <v-file-input
                  v-model="file"
                  label="Anexar orçamento"
                ></v-file-input>
                <v-btn @click="addBudget" block>Adicionar</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-card>
</template>

<script setup>
const config = useRuntimeConfig();

const name = ref();
const file = ref();
const value = ref();
const formData = reactive(new FormData());
const alertBudget = ref(false);
const alertBudgetContent = reactive({
  title: "",
  color: "",
  text: "",
});

const budgets = ref([]);

const createFormData = () => {
  const params = {
    name: name.value,
    value: value.value,
    file: file.value,
  };

  Object.entries(params).forEach(([k, v]) => formData.append(k, v));
};

const resetFormData = () => {
  name.value = "";
  value.value = "";
  file.value = {};

  formData.forEach((_, key) => {
    formData.delete(key);
  });
};

const setErrorBudgetAlertContent = () => {
  alertBudgetContent.title = "Ocorreu um erro";
  alertBudgetContent.text = "Tente novamente mais tarde";
  alertBudgetContent.color = "red-accent-4";
};

const setSuccessBudgetAlertContent = () => {
  alertBudgetContent.title = "Usuário atualizado com sucesso";
  alertBudgetContent.text = "";
  alertBudgetContent.color = "green-accent-4";
};

async function addBudget() {
  alertBudget.value = false;
  createFormData();

  try {
    const response = await $fetch(`${config.public.SERVICES_API_HOST}/budgets`, {
      method: "post",
      body: formData,
    });

    if (response.data.budget) {
      budgets.value.push({
        id: budgets.value.length,
        name: name.value,
        value: value.value,
      });
      setSuccessBudgetAlertContent();
      alertBudget.value = true;
      resetFormData();
    }
  } catch (e) {
    setErrorBudgetAlertContent();
    alertBudget.value = true;
  }
}
</script>