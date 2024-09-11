import { 
  createDirectus,
  rest,
  readItem,
  readItems,
  readFile,
  createItem,
  uploadFiles,
  updateItem,
  login,
  authentication,
} from "@directus/sdk";


export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const directus = createDirectus(config.public.SERVICES_API_HOST).with(authentication('cookie')).with(rest());

  return {
    provide: {
      directus,
      readItem,
      readItems,
      createItem,
      readFile,
      uploadFiles,
      updateItem,
      login,
    },
  };
});
