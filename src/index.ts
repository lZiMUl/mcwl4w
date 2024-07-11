// Import basic dependencies
import koaServer from "./server/koaServer";
import { Command, Option } from "commander";
import { getConfig } from "./util/apiUtil";
import { chalk, logger } from "./helper/helper";

// Create a new command
const program: Command = new Command();

// Set the version
program.version("1.0.0");

// Set the option content
program.addOption(new Option("-h, --host <string>", "Custom Web Host"));
program.addOption(new Option("-p, --port <number>", "Custom Web Port"));

// Parse parameters
program.parse(process.argv);

// Get host and port
const [host, port]: Array<string | number> = [
	program.opts().host ?? getConfig("webServer", "host"),
	program.opts().port ?? getConfig("webServer", "port")
];

koaServer.listen({ host, port }, (): void => {
	logger.info(chalk.red("----------lZiMUl MCWL4W 服务----------"));
	logger.info(chalk.blue(`该 Web服务器 在 主机为 [${host}], 端口为 [${port}] 上开放`));
	logger.info(chalk.white(`http://${host === "0.0.0.0" ? "127.0.0.1" : host}:${port}/`));
	logger.info(chalk.yellow("复制此地址，然后在浏览器中打开它"));
	logger.info(chalk.red("----------lZiMUl MCWL4W 服务----------\n"));
});