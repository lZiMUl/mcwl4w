// Import basic dependencies
import { ParameterizedContext } from 'koa';
import KoaRouter from 'koa-router';
import { getConfig } from '../util/apiUtil';
import { ConfigType } from '../type/serviceType';
import { JSONStringify } from '../helper/helper';

// Initialize koa-router instance
const koaRouter: KoaRouter = new KoaRouter();

const configType: ConfigType = 'globalConfig';

// Create router path
koaRouter.get(
  '/getConfigInfo',
  async (socket: ParameterizedContext): Promise<void> => {
    socket.status = 200;
    socket.type = 'application/json';
    socket.body = JSONStringify({
      title: getConfig(configType, 'title'),
      contactContent: getConfig(configType, 'contactContent'),
      contactNumber: getConfig(configType, 'contactNumber'),
      contactLink: getConfig(configType, 'contactLink')
    });
  }
);

// Export router
export default koaRouter.routes();
