export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    status: 203,
    data: {
      service: body,
    },
  };
});