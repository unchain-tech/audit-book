module.exports = {
    semi: true,
    tabWidth: 4,
    trailingComma: 'es5',
    singleQuote: true,
    importOrder: ['^[./]', '^@/(.*)$'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderGroupNamespaceSpecifiers: true,
    importOrderCaseInsensitive: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
};
