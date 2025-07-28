import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Espalhar cada item do preset TypeScript ESLint
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      ...(config.languageOptions ?? {}),
      parserOptions: {
        ...(config.languageOptions?.parserOptions ?? {}),
        project: "./tsconfig.json",
      },
    },
  })),
]);
