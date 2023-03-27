import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

const { PUBLIC_SITE_DOMAIN, PUBLIC_BASE_URL } = process.env;

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  site: PUBLIC_SITE_DOMAIN,
  base: PUBLIC_BASE_URL,
});
