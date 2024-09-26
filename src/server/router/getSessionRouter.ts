// Import basic dependencies
import { ParameterizedContext } from 'koa';
import KoaRouter from 'koa-router';
import { JSONStringify, uuidV7 } from '../helper/helper';
import { generateExpireTime, getConfig } from '../util/apiUtil';

// Initialize koa-router instance
const koaRouter: KoaRouter = new KoaRouter();

// Create router path
koaRouter.get(
  '/getSession',
  async (socket: ParameterizedContext): Promise<void> => {
    socket.status = 200;
    socket.type = 'application/json';
    socket.body = JSONStringify({
      session: uuidV7(),
      expireTime: generateExpireTime(getConfig('webService', 'sessionTimeout'))
    });
  }
);

// Export router
export default koaRouter.routes();
