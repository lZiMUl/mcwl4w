// Import basic dependencies
import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import { uuidV7 } from "../helper/helper";
import { generateExpireTime } from "../util/apiUtil";

// Initialize koa-router instance
const koaRouter: KoaRouter = new KoaRouter();

// Create router path
koaRouter.get("/getSession", async (socket: ParameterizedContext): Promise<void> => {
	socket.status = 200;
	socket.type = "application/json";
	socket.body = JSON.stringify({
		session: uuidV7(),
		expireTime: generateExpireTime(20)
	});
});

// Export router
export default koaRouter.routes();