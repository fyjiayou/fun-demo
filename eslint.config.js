import { defineConfig } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  ...pluginVue.configs['flat/essential']
])
