import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      allow: [
        resolve(__dirname, "."),
        resolve(
          __dirname,
          "node_modules/@fortawesome/fontawesome-free/webfonts"
        ),
        resolve(__dirname, "node_modules/vite/dist/client"),
        "C:/Users/USUARIO/OneDrive/Desktop/Santiago/Proyectos/Restaurant",
      ],
    },
  },
});
