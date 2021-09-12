module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
  },
}
