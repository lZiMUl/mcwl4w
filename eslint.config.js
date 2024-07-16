const globals = require("globals");
const pluginJs = require("@eslint/js");
const tsEslint = require("typescript-eslint");

module.exports = {
	files: ["/src/**/*.ts"],
	languageOptions: { globals: globals.browser },
	...pluginJs.configs.recommended,
	...tsEslint.configs.recommended
};
