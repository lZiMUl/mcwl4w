// Import basic dependencies
import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import { getConfig } from "../util/apiUtil";
import { ConfigType } from "../type/serviceType";

// Initialize koa-router instance
const koaRouter: KoaRouter = new KoaRouter();

const configType: ConfigType = "globalConfig";

const [title, contactContent, contactNumber, contactLink]: Array<string> = [
	getConfig(configType, "title"),
	getConfig(configType, "contactContent"),
	getConfig(configType, "contactNumber"),
	getConfig(configType, "contactLink")
];

// Create router path
koaRouter.get(
	"/getConfigInfo",
	async (socket: ParameterizedContext): Promise<void> => {
		socket.status = 200;
		socket.type = "application/json";
		socket.body = JSON.stringify({
			title,
			contactContent,
			contactNumber,
			contactLink
		});
	}
);

// Export router
export default koaRouter.routes();
