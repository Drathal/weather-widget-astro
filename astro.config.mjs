import { defineConfig } from "astro/config";
import basicSsl from "@vitejs/plugin-basic-ssl";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [solid(), tailwind()],
  vite: {
    plugins: [
      basicSsl({
        /** name of certification */
        name: "hello",
        /** custom trust domains */
        domains: ["localhost"],
      }),
    ],
  },
  output: "server",
  adapter: vercel(),
});
