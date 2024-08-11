export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);

  return {
    status: 203,
    data: {
      expense: body,
    },
  };
});
