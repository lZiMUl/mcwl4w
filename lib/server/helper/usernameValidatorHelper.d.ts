declare class UsernameValidatorHelper {
  private static minLength;
  private static maxLength;
  private static allowedCharacters;

  static validate(username: string): {
    valid: boolean;
    message: string;
  };
}

export default UsernameValidatorHelper;
//# sourceMappingURL=usernameValidatorHelper.d.ts.map
