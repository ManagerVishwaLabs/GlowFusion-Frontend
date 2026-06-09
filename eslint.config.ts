import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import cssModules from "eslint-plugin-css-modules";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "css-modules": cssModules,
      import: importPlugin,
      perfectionist,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "css-modules/no-undef-class": "error",
      "css-modules/no-unused-class": "error",
      "import/no-namespace": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              importNames: ["default"],
              message: "Do not import React. Use named imports only.",
              name: "react",
            },
          ],
        },
      ],

      "no-restricted-syntax": [
        "error",
        {
          message: "Do not use namespace imports. Import only what you need.",
          selector: "ImportNamespaceSpecifier",
        },
      ],
      "no-unused-vars": "off",
      "perfectionist/sort-jsx-props": "error",
      "perfectionist/sort-objects": "error",

      "simple-import-sort/exports": "error",

      "simple-import-sort/imports": "error",
    },
  },
]);
