// Import basic dependencies
import axios from 'axios';
import semver from 'semver';
import koaService, { connectRconService } from './service/koaService';
import { Command, Option } from 'commander';
import { getConfig } from './util/apiUtil';
import { chalk, logger } from './helper/helper';
import ServiceType from './type/serviceType';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version as localVersion } from '../package.json';

// Create a new command
const program: Command = new Command();

// Set the version
program.version(localVersion);

// Set the option content
program.addOption(new Option('-h, --host <string>', 'Custom Web Host'));
program.addOption(new Option('-p, --port <number>', 'Custom Web Port'));

// Parse parameters
program.parse(process.argv);

const serviceType: ServiceType = 'webService';

// Get host and port
const [host, port]: Array<string | number> = [
  program.opts().host ?? getConfig(serviceType, 'host'),
  program.opts().port ?? getConfig(serviceType, 'port')
];

logger.info(chalk.red(chalk.bold('----------lZiMUl MCWL4W 服务----------')));
logger.info(chalk.green(`开始检测版本, 当前版本 (${localVersion})`));
axios
  .request({
    baseURL: 'https://raw.githubusercontent.com',
    url: '/lZiMUl/mcwl4w/main/package.json',
    method: 'GET',
    timeout: 5000
  })
  .then(({ data: { version: remoteVersion } }): void => {
    if (semver.lt(localVersion, remoteVersion)) {
      logger.warn(chalk.yellow(`检测到新版本, 最新版本 (${remoteVersion})`));
      logger.warn(
        chalk.yellow(`点击此连接前往下载 (https://github.com/lZiMUl/mcwl4w)\n`)
      );
    } else logger.info(chalk.green(`当前已经是最新版本\n`));
  })
  .catch((): void => {
    logger.error(
      chalk.red(
        '自动检查更新失败, 请检查你的网络情况 [https://raw.githubusercontent.com/lZiMUl/mcwl4w/main/package.json]\n'
      )
    );
  })
  .finally((): void => {
    koaService.listen({ host, port }, async (): Promise<void> => {
      logger.info(chalk.green('正在连接 Rcon 服务'));
      await connectRconService();
      logger.info(
        chalk.green(`该 Web服务 在 主机为 [${host}], 端口为 [${port}] 上开放`)
      );
      logger.info(
        chalk.green(`http://${host === '0.0.0.0' ? '127.0.0.1' : host}:${port}`)
      );
      logger.info(chalk.green('复制此地址，然后在浏览器中打开它'));
      logger.info(
        chalk.red(chalk.bold('----------lZiMUl MCWL4W 服务----------\n'))
      );
    });
  });
