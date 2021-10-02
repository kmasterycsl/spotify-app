module.exports = {
    root: true,
    extends: "@react-native-community",
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": 1,
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
    },
};
