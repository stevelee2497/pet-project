module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/prefer-stateless-function': ['off', { ignorePureComponents: true }],
    'linebreak-style': 'off',
    'react/destructuring-assignment': 'off',
    'global-require': 'off',
    'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off'
  },
  globals: {
    fetch: false
  }
};
