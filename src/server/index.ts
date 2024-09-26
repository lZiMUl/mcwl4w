// Import basic dependencies
import axios from 'axios';
import semver from 'semver';
import koaService, { connectRconService } from './service/koaService';
import { Command, Option } from 'commander';
import { getConfig } from './util/apiUtil';
import { chalk, logger } from './helper/helper';
import { ServiceType } from './type/serviceType';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version as localVersion } from '../package.json';

// Create a new command
const program: Command = new Command();

// Set the version
program.version(localVersion);

// Set the option content
program.addOption(
  new Option('-h, --host <string>', 'Specify the host address')
);
program.addOption(new Option('-p, --port <number>', 'Specify the port number'));

// Parse parameters
program.parse(process.argv);

const serviceType: ServiceType = 'webService';

// Get host and port
const [host, port]: Array<string | number> = [
  program.opts().host ?? getConfig(serviceType, 'host') ?? '0.0.0.0',
  program.opts().port ?? getConfig(serviceType, 'port') ?? '22'
];

logger.info(
  chalk.red(chalk.bold('---------- lZiMUl MCWL4W Service ----------'))
);
logger.info(
  chalk.green(`Checking for updates, current version is (${localVersion})`)
);

// Check for updates by fetching the latest version from GitHub
axios
  .request({
    baseURL: 'https://raw.githubusercontent.com',
    url: '/lZiMUl/mcwl4w/main/package.json',
    method: 'GET',
    timeout: 5000
  })
  .then(({ data: { version: remoteVersion } }): void => {
    if (semver.lt(localVersion, remoteVersion)) {
      logger.warn(
        chalk.yellow(`A newer version (${remoteVersion}) is available.`)
      );
      logger.warn(
        chalk.yellow(
          `Click the link to download: https://github.com/lZiMUl/mcwl4w\n`
        )
      );
    } else {
      logger.info(chalk.green(`You are using the latest version.\n`));
    }
  })
  .catch((): void => {
    logger.error(
      chalk.red(
        'Failed to automatically check for updates. Please verify your network connection [https://raw.githubusercontent.com/lZiMUl/mcwl4w/main/package.json]\n'
      )
    );
  })
  .finally((): void => {
    koaService.listen({ host, port }, async (): Promise<void> => {
      logger.info(chalk.green('Connecting to the Rcon service...'));
      await connectRconService();
      logger.info(
        chalk.green(
          `The Web service is running on host [${host}] and port [${port}].`
        )
      );
      logger.info(
        chalk.green(
          `Visit: http://${host === '0.0.0.0' ? '127.0.0.1' : host}:${port}`
        )
      );
      logger.info(chalk.green('Copy the link and open it in your browser.'));
      logger.info(
        chalk.red(chalk.bold('---------- lZiMUl MCWL4W Service ----------\n'))
      );
    });
  });
