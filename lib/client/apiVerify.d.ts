export declare class windowApiVerify {
	constructor(attribute: keyof typeof window, success: (attribute: (typeof window)[keyof typeof window]) => void, fail: (message: string) => void);
}

export declare class navigatorApiVerify {
	constructor(attribute: keyof typeof navigator, success: (attribute: (typeof navigator)[keyof typeof navigator]) => void, fail: (message: string) => void);
}

//# sourceMappingURL=apiVerify.d.ts.map