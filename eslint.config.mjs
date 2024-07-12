import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["/**/*.ts"],
		languageOptions: {
			globals: globals.node
		},
		...tseslint.configs.recommended
	}
];
