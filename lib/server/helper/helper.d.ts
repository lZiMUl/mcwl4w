import { Logger } from 'log4js';
import chalk from 'chalk';
import { v7 as uuidV7 } from 'uuid';

declare const logger: Logger;

declare function JSONStringify<T extends object>(data: T): string;

export { logger, chalk, uuidV7, JSONStringify };
//# sourceMappingURL=helper.d.ts.map
