export interface ValidateResult {
  valid: boolean;
  message: string;
}

export default class UsernameValidatorHelper {
  private static minLength;
  private static maxLength;
  private static allowedCharacters;

  static validate(username: string): ValidateResult;
}
//# sourceMappingURL=usernameValidator.d.ts.map
