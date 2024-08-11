export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('aaaa', body);

  return {
    status: 200,
    data: {
      service: body,
    },
  };
});
