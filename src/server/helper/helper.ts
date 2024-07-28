// Import basic dependencies
import log4js, { Logger } from 'log4js';
import chalk from 'chalk';
import { v7 as uuidV7 } from 'uuid';

const logger: Logger = log4js.getLogger();
logger.level = 'info';

function JSONStringify<T extends object>(data: T): string {
  return JSON.stringify(data, null, 2);
}

export { logger, chalk, uuidV7, JSONStringify };
