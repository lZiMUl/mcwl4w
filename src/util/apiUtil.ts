import { readFileSync } from "fs";
import { parse } from "toml";
import absolutePath from "./pathUtil";

// interface GetSecurityLicense {
// 	key: string;
// 	cert: string;
// }

interface Config {
	[key: string]: any;
}

// Read configuration data
function getConfig(index: string, key: string, file?: string): (Config | null) {
	const parseData = parse(readFileSync(absolutePath(`./config/${file ? file : "default"}.toml`), "utf-8"));
	return Reflect.get(Reflect.get(parseData, index), key) ?? null;
}

// Verify the certificate
// const getSecurityLicense: GetSecurityLicense = {
// 	key: readFileSync(absolutePath('./config/server.key'), 'utf-8'),
// 	cert: readFileSync(absolutePath('./config/server.cert'), 'utf-8')
// };

// Export api
export type { Config };
export {
	getConfig
	// getSecurityLicense
};