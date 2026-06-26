import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // TypeScript handles this
    },
    languageOptions: {
      globals: {
        React: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
  },
  {
    ignores: [".next/", "node_modules/", "drizzle/"],
  },
];
