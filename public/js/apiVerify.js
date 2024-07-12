export class windowApiVerify {
    constructor(attribute, success, fail) {
        if (success) {
            if (attribute in window) {
                success(window[attribute]);
            }
            else {
                fail(`Your current browser does not support [${attribute}] service parameter`);
            }
        }
    }
}
export class navigatorApiVerify {
    constructor(attribute, success, fail) {
        if (success) {
            if (attribute in navigator) {
                success(navigator[attribute]);
            }
            else {
                fail(`Your current browser does not support [${attribute}] service parameter`);
            }
        }
    }
}
