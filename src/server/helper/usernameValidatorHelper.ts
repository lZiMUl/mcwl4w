export interface ValidateResult {
  valid: boolean;
  message: string;
}

export default class UsernameValidatorHelper {
  private static minLength: number = 3;
  private static maxLength: number = 20;
  private static allowedCharacters: RegExp = /^[a-zA-Z0-9_]+$/;

  public static validate(username: string): ValidateResult {
    if (username.length < this.minLength) {
      return {
        valid: false,
        message: `Username must be at least ${this.minLength} characters long`
      };
    }

    if (username.length > this.maxLength) {
      return {
        valid: false,
        message: `Username cannot exceed ${this.maxLength} characters`
      };
    }

    if (!this.allowedCharacters.test(username)) {
      return {
        valid: false,
        message: 'Username can only contain letters, numbers, and underscores'
      };
    }

    return {
      valid: true,
      message: 'Username is valid'
    };
  }
}
