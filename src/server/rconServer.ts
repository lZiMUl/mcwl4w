import { Rcon } from "rcon-client";
import { getConfig } from "../util/apiUtil";

const [
	host,
	port,
	password
]: [string, number, string] = [
	(getConfig("rconServer", "host") ?? "127.0.0.1") as string,
	(getConfig("rconServer", "port") ?? 25575) as number,
	(getConfig("rconServer", "password") ?? "") as string
];

export default new Rcon({ host, port, password });
