// Import basic dependencies
import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import getView from "../util/viewUtil";

// Initialize koa-router instance
const koaRouter: KoaRouter = new KoaRouter();

// Create router path
koaRouter.get("/", async (socket: ParameterizedContext): Promise<void> => {
	socket.status = 200;
	socket.type = "text/html";
	socket.body = getView("index");
});

// Export router
export default koaRouter.routes();
