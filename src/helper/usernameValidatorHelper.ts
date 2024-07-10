class UsernameValidatorHelper {
	private static minLength: number = 3;
	private static maxLength: number = 20;
	private static allowedCharacters: RegExp = /^[a-zA-Z0-9_]+$/;

	static validate(username: string): { valid: boolean, message: string } {
		if (username.length < this.minLength) {
			return {
				valid: false,
				message: `用户名长度必须至少为 ${this.minLength} 个字符。`
			};
		}

		if (username.length > this.maxLength) {
			return {
				valid: false,
				message: `用户名的长度不得超过 ${this.maxLength} 个字符。`
			};
		}

		if (!this.allowedCharacters.test(username)) {
			return {
				valid: false,
				message: "用户名只能包含字母、数字和下划线。"
			};
		}

		return {
			valid: true,
			message: "用户名有效。"
		};
	}
}

// Export Class
export default UsernameValidatorHelper;