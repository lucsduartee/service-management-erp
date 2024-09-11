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

const directus = createDirectus(process.env.SERVICES_API_HOST).with(authentication('cookie')).with(rest());

export default defineNuxtPlugin(() => {
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
