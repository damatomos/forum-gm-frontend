import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import parser from '@typescript-eslint/parser'
import path from 'path'

// Configuração do projeto Vue + TypeScript
import { configureVueProject } from '@vue/eslint-config-typescript'
configureVueProject({
  tsSyntaxInTemplates: true,
  scriptLangs: ['ts', 'tsx', 'js', 'jsx'],
  allowComponentTypeUnsafety: true,
  rootDir: path.resolve(__dirname),
})

// Arquivos a ignorar
const ignores = [
  '**/dist/**',
  '**/dist-ssr/**',
  '**/coverage/**',
  'vitest.config.ts', // ignorar configs fora do src
]

// Exporta configuração
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],

    languageOptions: {
      parser,
      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.eslint.json'), // tsconfig separado
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
    },

    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'warn',

      // Prettier/format
      'prettier/prettier': 'warn',
    },
  },

  globalIgnores(ignores),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'], // aplica apenas em testes
  },

  skipFormatting,
)
