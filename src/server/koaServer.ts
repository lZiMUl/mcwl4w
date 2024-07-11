// Import basic dependencies
import Koa from "koa";
import koaStatic from "koa-static";
import koaBodyparser from "koa-bodyparser";

// Import router
import index from "../router/indexRouter";
import getSession from "../router/getSessionRouter";
import whitelist from "../router/whitelistRouter";
import sentVerifyCode from "../router/sentVerifyCodeRouter";

// Initialize koa instance
const koaServer: Koa = new Koa();

// Setup static of the router
koaServer.use(koaStatic("."));
koaServer.use(koaBodyparser({
	enableTypes: ["json", "form", "text"]
}));

// Set up the router
koaServer.use(index);
koaServer.use(getSession);
koaServer.use(whitelist);
koaServer.use(sentVerifyCode);

// Set up the 404 page
koaServer.use(async (socket: Koa.ParameterizedContext<Koa.DefaultContext>): Promise<void> => {
	socket.status = 404;
	socket.type = "text/html";
	socket.body = "Sorry! The Page Is Missing";
});

export default koaServer;