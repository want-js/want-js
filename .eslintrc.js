module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        'import',
        '@typescript-eslint',
    ],
    env: {
        node: true,
    },
    extends: "airbnb-base",
    rules: {
        indent: [2, 4, {SwitchCase: 1}],
    },
};
