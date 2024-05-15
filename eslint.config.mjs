import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

const MAX_CODE_COMPLEXITY = 5;

export default [
  {
    ignores: ["**/*.d.ts"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      camelcase: "error",
      "capitalized-comments": "error",
      complexity: ["error", MAX_CODE_COMPLEXITY],
      "consistent-return": "error",
      curly: "error",
      "default-param-last": "error",
      eqeqeq: "error",
      "no-console": "error",
      "no-duplicate-imports": "error",
      "no-magic-numbers": "error",
      "no-nested-ternary": "error",
      "no-param-reassign": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-shadow": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "error",
      "no-use-before-define": "error",
      "no-useless-concat": "error",
      "prefer-const": "error",
      "require-atomic-updates": "error",
      "require-await": "error",
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
        },
      ],
      yoda: "error",
    },
  },
  eslintConfigPrettier,
];
