// Import basic dependencies
import Koa, { DefaultContext, ParameterizedContext } from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';

// Import router
import index from '../router/indexRouter';
import getSession from '../router/getSessionRouter';
import whitelist, { connectRconService } from '../router/whitelistRouter';
import sentVerifyCode from '../router/sentVerifyCodeRouter';

// Initialize koa instance
const koaService: Koa = new Koa();

// Setup static of the router
koaService.use(koaStatic('.'));
koaService.use(
  koaBodyparser({
    enableTypes: ['json']
  })
);

// Set up the router
koaService.use(index);
koaService.use(getSession);
koaService.use(whitelist);
koaService.use(sentVerifyCode);

// Set up the 404 page
koaService.use(
  async (socket: ParameterizedContext<DefaultContext>): Promise<void> => {
    socket.status = 404;
    socket.type = 'text/html';
    socket.body = 'Sorry! The Page Is Missing';
  }
);

export default koaService;
export { connectRconService };
