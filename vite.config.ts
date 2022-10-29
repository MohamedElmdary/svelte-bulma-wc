import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "SvelteBulmaWC",
      entry: "./src/public_api.ts",
      formats: ["es"],
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
})
