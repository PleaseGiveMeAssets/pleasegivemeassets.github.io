import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  ...pluginVue.configs["flat/recommended"],
  // prettier,
  eslintConfigPrettier,
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.

  {
    plugins: {
      // You’d typically use one of the following two:
      // typescriptEslint: typescriptEslint,
      // typescriptEslint,
      // But in this example we give it another name.
      // It might be tempting to use something shorter like “ts”:
      // "prettier"
      prettier: prettierPlugin,
    },
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // 줄 끝 스타일을 자동으로 설정 (CRLF/LF 혼용 허용)
        },
      ],
      "vue/no-unused-vars": "error", // Vue.js에서 사용되지 않는 변수 에러 처리
      // ...prettierPlugin.configs.recommended.rules,
      // 'prettier': 'error',   // Prettier 규칙 위반 시 에러 처리
    },
  },
];
