module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-octal-escape": "error",
    "no-irregular-whitespace": "error",
    "no-control-regex": "error",
    "no-misleading-character-class": "error",
    "no-useless-escape": "error",
    "prefer-template": "warn",
    "template-curly-spacing": ["error", "never"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
