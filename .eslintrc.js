module.exports = {
    extends: [
      'alloy',
      'alloy/typescript',
    ],
    root: true,
    env: {
      browser: true,
      es6: true,
      mocha: true,
    },
    globals: {
      cy: true,
      NodeJS: true,
    },
    rules: {
      complexity: ['error', { max: 20 }],
      'max-len': ['error', { code: 120 }],
      '@typescript-eslint/no-explicit-any': 'off',
      "@typescript-eslint/explicit-member-accessibility": "off",
    },
    // js默认解析器
    parser: 'babel-eslint',
    // js默认解析器配置
    parserOptions: {
      requireConfigFile: true,
      ecmaVersion: '6',
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint', // 处理ts文件
    ],
    overrides: [
      {
        files: ['*.ts', "*.tsx", '*.js'],
        parser: '@typescript-eslint/parser',
        extends: [
          // 'plugin:@typescript-eslint/recommended', // 基础的ts规范，来自ts plugin
          'alloy/typescript',
        ],
      },
      {
        "files": ["*.ts", "*.tsx"],
        "rules": {
          "@typescript-eslint/explicit-member-accessibility": ["error"]
        }
      },
    ],
  };