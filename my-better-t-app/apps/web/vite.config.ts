// import tailwindcss from "@tailwindcss/vite";
// import { tanstackStart } from "@tanstack/react-start/plugin/vite";
// import viteReact from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
//   server: {
//     port: 3001,
//     strictPort: true,
//     cors: {
//       origin: ["http://localhost:8081"],
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     },
//   },
// });


import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
  server: {
    port: 3001,
    strictPort: true,
    host: "0.0.0.0", //
    cors: {
      origin: ["http://localhost:8081", "exp://*", "http://172.20.10.2:8081"], // 
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
});