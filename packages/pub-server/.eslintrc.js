module.exports = {
    extends: ['@bravo68web/eslint-config/dist/ultimate'],
    parserOptions: {
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
    rules: {
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-empty-interface": "off"
	},
};