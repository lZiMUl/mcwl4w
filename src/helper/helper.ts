// Import basic dependencies
import chalk from "chalk";
import log4js, { Logger } from "log4js";

const logger: Logger = log4js.getLogger();
logger.level = "info";

export {
	chalk,
	logger
};