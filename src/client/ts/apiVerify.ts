// windowApiVerify.ts
export class windowApiVerify {
  public constructor(
    attribute: keyof typeof window,
    success: (attribute: (typeof window)[keyof typeof window]) => void,
    fail: (message: string) => void,
  ) {
    if (success) {
      if (attribute in window) {
        success(window[attribute]);
      } else {
        fail(
          `Your current browser does not support [${attribute}] service parameter`,
        );
      }
    }
  }
}

// navigatorApiVerify.ts
export class navigatorApiVerify {
  public constructor(
    attribute: keyof typeof navigator,
    success: (attribute: (typeof navigator)[keyof typeof navigator]) => void,
    fail: (message: string) => void,
  ) {
    if (success) {
      if (attribute in navigator) {
        success(navigator[attribute]);
      } else {
        fail(
          `Your current browser does not support [${attribute}] service parameter`,
        );
      }
    }
  }
}
