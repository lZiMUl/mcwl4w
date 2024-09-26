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
import userDataStorage from '../util/userDataStorageUtil';
import { getConfig } from '../util/apiUtil';
import { ConfigType } from '../type/serviceType';

const koaRouter: KoaRouter = new KoaRouter();

/**
 * Function to add a player to the whitelist.
 */
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
    logger.info(
      chalk.green(`User: [${username}] successfully added to the whitelist!`)
    );
    await rs.send('whitelist reload');
    logger.info(chalk.green(`Reloading whitelist!`));
    userDataStorage.Save({
      username,
      email
    });
    socket.body = JSONStringify({
      code: 200,
      message: 'Successfully added to the whitelist!',
      data: []
    });
  } else {
    logger.warn(
      chalk.yellow(
        `User: [${username}] failed to add to the whitelist, possible duplicate addition!`
      )
    );
    socket.body = JSONStringify({
      code: 300,
      message: 'Failed to add to the whitelist, check if already whitelisted!',
      data: []
    });
  }
}

// Rcon service event listeners
rconService.on('connect', () =>
  logger.info(chalk.green('Rcon service connected, authenticating'))
);
rconService.on('authenticated', (): void => {
  logger.info(chalk.green('Rcon service authenticated successfully\n'));
});
rconService.on('error', () => {
  logger.warn(chalk.yellow('Rcon service connection error'));
});
rconService.on('end', (): void => {
  logger.error(chalk.red('Rcon service has been closed'));
});

/**
 * Route to add a user to the whitelist.
 */
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
          chalk.yellow(
            `User: [${username}] failed to add to the whitelist, ${message}!`
          )
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

/**
 * Function to connect to the Rcon service.
 */
export async function connectRconService(): Promise<void> {
  await rconService.connect();
}

// Export router
export default koaRouter.routes();
