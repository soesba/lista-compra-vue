import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue, { rules } from "eslint-plugin-vue";
/** @type
 * {import('eslint').Linter.Config[]}
 * */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions: {
      globals:
        globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"], {
    files: ["**/*.vue"], languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    rules: {
      indent: ["error", 2],
      arrowSpacing: ["error", "as-needed"],
      "no-multi-spaces": ["error"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "no-trailing-spaces": ["error", { skipBlankLines: false }]
    }
  }
];