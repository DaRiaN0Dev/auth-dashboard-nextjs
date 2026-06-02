import { defineConfig } from "@fullstacksjs/eslint-config";

export default defineConfig({
  typescript: {
    tsconfigRootDir: import.meta.dirname,
  },
  react: true,
  next: true,
  tailwind: true,
  ignores: ["postcss.config.mjs", "eslint.config.mjs"],
});
