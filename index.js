let nodeModules = [...require("node:module").builtinModules];

for (const mod of nodeModules) {
    nodeModules = [...nodeModules, `node:${mod}`];
}

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:unicorn/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "prettier",
        "simple-import-sort",
        "unicorn",
    ],
    rules: {
        // disabled type-required rules
        "@typescript-eslint/no-misused-promises": [
            "error",
            { checksVoidReturn: false },
        ],
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/unbound-method": "off",

        // disabled recommended rules
        "no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        quotes: "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        indent: "off",
        "@typescript-eslint/indent": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/filename-case": "off",
        "unicorn/catch-error-name": "off",
        "unicorn/no-process-exit": "off",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/no-negated-condition": "off",

        // manually enabled rules
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
        ],
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "never",
            },
        ],
        semi: ["error", "always"],
        eqeqeq: ["error", "smart"],
        "no-constant-binary-expression": "error",
        "no-duplicate-imports": "error",
        "no-new-native-nonconstructor": "error",
        "no-template-curly-in-string": "error",
        "no-unreachable-loop": "error",
        "require-atomic-updates": ["error", { allowProperties: true }],
        curly: ["error", "multi-line", "consistent"],

        // sorting
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    // Node.js builtins. You could also generate this regex if you use a `.js` config.
                    // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                    // Note that if you use the `node:` prefix for Node.js builtins,
                    // you can avoid this complexity: You can simply use "^node:".
                    [`^(${nodeModules.join("|")})(/|$)`],
                    // Packages. `react` related packages come first.
                    ["^@?\\w"],
                    // Internal packages.
                    ["^(~)(/.*|$)"],
                    // Side effect imports.
                    ["^\\u0000"],
                    // Parent imports. Put `..` last.
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    // Style imports.
                    ["^.+\\.s?css$"],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
    },
    ignorePatterns: [".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
        ecmaVersion: "latest",

        // configure this manually on every project
        // tsconfigRootDir: __dirname,
        // project: ["./backend/tsconfig.json", "./extension/tsconfig.json"],
    },
    env: {
        es2024: true,
        node: true,
    },
};
