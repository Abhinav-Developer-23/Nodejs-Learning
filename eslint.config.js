module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.min.js', 'coverage/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly'
      }
    },
    rules: {
      // Only error detection rules - no style enforcement
      'no-undef': 'error',
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-unreachable': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-irregular-whitespace': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable-loop': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-const-assign': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-imports': 'error',
      'no-redeclare': 'error',
      'no-shadow-restricted-names': 'error',
      'no-this-before-super': 'error',
      'no-use-before-define': ['error', { functions: false }],
      'no-var': 'off', // Style - disabled
      'prefer-const': 'off', // Style - disabled
      'prefer-arrow-callback': 'off', // Style - disabled
      'semi': 'off', // Style - disabled
      'quotes': 'off', // Style - disabled
      'indent': 'off', // Style - disabled
      'comma-dangle': 'off', // Style - disabled
      'object-curly-spacing': 'off', // Style - disabled
      'array-bracket-spacing': 'off', // Style - disabled
      'keyword-spacing': 'off', // Style - disabled
      'space-before-blocks': 'off', // Style - disabled
      'space-before-function-paren': 'off', // Style - disabled
      'space-in-parens': 'off', // Style - disabled
      'space-infix-ops': 'off', // Style - disabled
      'space-unary-ops': 'off', // Style - disabled
      'eol-last': 'off', // Style - disabled
      'no-trailing-spaces': 'off', // Style - disabled
      'no-multiple-empty-lines': 'off', // Style - disabled
      'brace-style': 'off', // Style - disabled
      'camelcase': 'off', // Style - disabled
      'max-len': 'off', // Style - disabled
      'max-lines': 'off', // Style - disabled
      'max-lines-per-function': 'off', // Style - disabled
      'arrow-parens': 'off', // Style - disabled
      'arrow-spacing': 'off', // Style - disabled
      'comma-spacing': 'off', // Style - disabled
      'comma-style': 'off', // Style - disabled
      'key-spacing': 'off', // Style - disabled
      'no-multi-spaces': 'off', // Style - disabled
      'space-after-keywords': 'off', // Style - disabled
      'no-console': 'off', // Allow console.log
      'no-debugger': 'warn' // Warn on debugger statements
    }
  }
];

