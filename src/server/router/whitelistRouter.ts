import { ParameterizedContext } from 'koa';
import KoaRouter from 'koa-router';
import { Rcon } from 'rcon-client';

import rconService from '../service/rconService';
import { chalk, JSONStringify, logger } from '../helper/helper';
import UsernameValidatorHelper from '../helper/usernameValidatorHelper';
import { DataModuleInterface } from '../interface/dataModuleInterface';
import GenerateRandomCaptcha from '../util/grcUtil';
import dataBodyVerifyUtil, {
  DataBodyVerifyInterface
} from '../util/dataBodyVerifyUtil';
import userDataStorage from '../util/userDataStorage';
import { getConfig } from '../util/apiUtil';
import { ConfigType } from '../type/serviceType';

const koaRouter: KoaRouter = new KoaRouter();

async function addWhitelist(
  rs: Rcon,
  socket: ParameterizedContext,
  username: string,
  email: string
): Promise<void> {
  const whitelist: string = await rs.send('whitelist list');
  const player: boolean = whitelist.includes(':')
    ? !whitelist.split(': ')[1].split(', ').includes(username)
    : true;

  if (player) {
    await rs.send(`whitelist add ${username}`);
    logger.info(chalk.green(`用户: [${username}] 添加到白名单成功!`));
    await rs.send('whitelist reload');
    logger.info(chalk.green(`白名单重载中!`));
    userDataStorage.Save({
      username,
      email
    });
    socket.body = JSONStringify({
      code: 200,
      message: '添加白名单成功!',
      data: []
    });
  } else {
    logger.warn(
      chalk.yellow(`用户: [${username}] 添加到白名单失败, 查看是否重复添加!`)
    );
    socket.body = JSONStringify({
      code: 300,
      message: '添加白名单失败, 查看是否已经在白名单中!',
      data: []
    });
  }
}

rconService.on('connect', () =>
  logger.info(chalk.green('Rcon 服务已连接, 正在进行认证'))
);
rconService.on('authenticated', (): void => {
  logger.info(chalk.green('Rcon 服务认证成功\n'));
});
rconService.on('error', () => {
  logger.warn(chalk.yellow('Rcon 服务连接错误'));
});
rconService.on('end', (): void => {
  logger.error(chalk.red('Rcon 服务已关闭'));
});

koaRouter.post(
  '/whitelist',
  async (socket: ParameterizedContext): Promise<void> => {
    socket.status = 200;
    socket.type = 'application/json';
    const dataBody: DataModuleInterface = socket.request
      .body as DataModuleInterface;
    const { session, username, email }: DataModuleInterface = dataBody;
    const { valid, code, message }: DataBodyVerifyInterface =
      dataBodyVerifyUtil(dataBody);
    const configType: ConfigType = 'globalConfig';
    if (getConfig(configType, 'debugMode') as boolean)
      logger.debug(`
    [DataBody]: ${dataBody}
    [Session]: ${session}
    [Username]: ${username}
    [Email]: ${email}
    [Valid]: ${valid}
    [Code]: ${code}
    [Message]: ${message}
    `);
    if (valid) {
      const { valid, message }: { valid: boolean; message: string } =
        UsernameValidatorHelper.validate(username);
      if (valid) {
        await addWhitelist(rconService, socket, username, email);
      } else {
        logger.warn(
          chalk.yellow(`用户: [${username}] 添加到白名单失败, ${message}!`)
        );
        socket.body = JSONStringify({
          code: 310,
          message,
          data: []
        });
      }
      GenerateRandomCaptcha.cleanCode(session);
    } else {
      socket.body = JSONStringify({
        code,
        message,
        data: []
      });
    }
  }
);

export async function connectRconService(): Promise<void> {
  await rconService.connect();
}

// Export router
export default koaRouter.routes();
