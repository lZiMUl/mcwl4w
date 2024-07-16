interface ConfigInterface {
	globalConfig: {
		title: string;
		contactContent: string;
		contactNumber: string;
		contactLink: string;
	};

	webService: {
		host: string;
		port: number;
		sessionTimeout: number;
	};

	emailService: {
		host: string;
		port: number;
		username: string;
		password: string;
		verifyCodeExpireTime: number;
	};

	rconService: {
		host: string;
		port: number;
		password: string;
	};
}

export default ConfigInterface;
