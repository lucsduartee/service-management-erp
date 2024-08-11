export default defineEventHandler((event) => {
  return {
    status: 200,
    data: [
      {
        id: 1,
        name: "Obra número 1",
        totalValue: 1000,
        spentValue: 200,
        grossMargin: 500,
        serviceStatus: "Em orçamento",
      },
      {
        id: 2,
        name: "Obra número 2",
        totalValue: 2000,
        spentValue: 700,
        grossMargin: 1000,
        serviceStatus: "Aguardando aprovação",
      },
      {
        id: 3,
        name: "Obra número 3",
        totalValue: 3000,
        spentValue: 1500,
        grossMargin: 2000,
        serviceStatus: "Em andamento",
      },
      {
        id: 4,
        name: "Obra número 4",
        totalValue: 4000,
        spentValue: 2800,
        grossMargin: 3000,
        serviceStatus: "Reprovado",
      },
      {
        id: 5,
        name: "Obra número 5",
        totalValue: 5000,
        spentValue: 3200,
        grossMargin: 4000,
        serviceStatus: "Finalzado",
      },
    ],
  };
});
