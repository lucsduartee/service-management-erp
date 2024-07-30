<template>
  <v-container>
    <h1 class="my-7">Serviço {{ id }}</h1>

    <v-row>
      <v-col>
        <h3>Orçamentos</h3>
        <v-list>
          <v-list-item>Orçamento 1: Valor xxx,xx</v-list-item>
          <v-list-item>Orçamento 2: Valor xxx,xx</v-list-item>
          <v-list-item>Orçamento 2: Valor xxx,xx</v-list-item>
        </v-list>

        <v-btn>Adicionar orçamento</v-btn>
      </v-col>

      <v-col>
        <h3>Registro de propostas</h3>
        <v-list>
          <v-list-item>Proposta 1: Enviada no dia xx/xx</v-list-item>
          <v-list-item>Proposta 2: Enviada no dia xx/xx</v-list-item>
          <v-list-item>Proposta 3: Enviada no dia xx/xx</v-list-item>
        </v-list>

        <v-btn>Adicionar proposta</v-btn>
      </v-col>
    </v-row>

    <div class="my-7">
      <p>Nome do serviço: {{ service.name }}</p>

      <p>Total disponibilizado: {{ service.totalValue }}</p>

      <p>Total gasto: {{ service.spentValue }}</p>

      <p>Margem bruta prevista: {{ service.grossMargin }}</p>

      <p>Status atual: {{ service.serviceStatus }}</p>

      <p>Total em despesas: 5000</p>

      <v-expansion-panels class="my-7">
        <v-expansion-panel v-for="(despesa, index) in despesas" :key="index">
          <v-expansion-panel-title>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">{{
                  despesa.name
                }}</v-col>
                <v-col class="text-grey" cols="4">
                  {{ despesa.type }}
                </v-col>

                <v-col class="text-grey" cols="4">
                  {{ despesa.value }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-btn>Ver nota fiscal</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script setup>
const { id } = useRoute().params;

const service = ref({
  id: 1,
  name: "Obra número 1",
  totalValue: 1000,
  spentValue: 200,
  grossMargin: 500,
  serviceStatus: "Em orçamento",
});

const despesas = ref([
  { id: 1, name: "Despesa 1", type: "Mão de obra", value: 100 },
  { id: 2, name: "Despesa 2", type: "Equipamento", value: 200 },
  { id: 3, name: "Despesa 3", type: "Material", value: 300 },
  { id: 4, name: "Despesa 4", type: "Outros", value: 400 },
]);
</script>
