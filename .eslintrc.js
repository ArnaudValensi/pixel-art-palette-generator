module.exports = {
  extends: 'airbnb-base',
  installedESLint: true,
  plugins: [
    'import',
    'json',
  ],
  globals: {
    p5: true
  },
  rules: {
    'no-new': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
  },
};
