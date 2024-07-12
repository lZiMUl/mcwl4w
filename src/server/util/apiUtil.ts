import { readFileSync } from "fs";
import { parse } from "toml";
import absolutePath from "./pathUtil";

interface Config {
	[key: string]: string | number;
}

// Read configuration data
function getConfig(index: string, key: string, file?: string): Config | null {
	const parseData = parse(readFileSync(absolutePath(`./config/${file ? file : "default"}.toml`), "utf-8"));
	return Reflect.get(Reflect.get(parseData, index), key) ?? null;
}

function generateExpireTime(minute: number): Date {
	const nowTime: Date = new Date();
	return new Date(nowTime.setMinutes(nowTime.getMinutes() + minute));
}

// Export api
export type { Config };
export {
	getConfig,
	generateExpireTime
};
