<template>
  <v-container>
    <h1 class="my-7 text-2xl">Serviço {{ id }}</h1>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Orçamentos</v-card-title>

          <v-card-item>Orçamento 1: Valor xxx,xx</v-card-item>
          <v-card-item>Orçamento 2: Valor xxx,xx</v-card-item>
          <v-card-item>Orçamento 2: Valor xxx,xx</v-card-item>
          <v-card-actions>
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
                      <v-text-field label="Nome de referência"></v-text-field>
                      <v-file-input label="Anexar orçamento"></v-file-input>
                      <v-btn block>Adicionar</v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-7">
      <v-col>
        <v-card>
          <v-card-title>Informações</v-card-title>
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
              :v-model="5000"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              label="Permissão"
              :items="['Em orçamento', 'Em andamento', 'Finalizado']"
              v-model="service.serviceStatus"
            ></v-select>
          </v-col>

          <v-col>
            <v-card-actions>
              <v-btn> Salvar alterações </v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>Despesas</v-card-title>
      <v-col>
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
                  <v-text-field label="Nome de referência"></v-text-field>
                  <v-text-field label="Valor"></v-text-field>
                  <v-select
                    label="Tipo da despesa"
                    :items="['Mão de obra', 'Equipamento', 'Material', 'Outros']"
                  ></v-select>
                  <v-file-input label="Anexar nota fiscal"></v-file-input>
                  <v-btn block>Adicionar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col>
        <v-expansion-panels>
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
              <v-btn class="mr-3">Ver nota fiscal</v-btn>
              <v-btn>Deletar despesa</v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-card>
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

const expanded = ref(true);
</script>
