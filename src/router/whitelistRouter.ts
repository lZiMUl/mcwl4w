import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import { Rcon } from "rcon-client";

import rconService from "../service/rconService";
import { chalk, logger } from "../helper/helper";
import UsernameValidatorHelper from "../helper/usernameValidatorHelper";
import { DataModuleInterface } from "../interface/dataModuleInterface";
import GenerateRandomCaptcha from "../util/grcUtil";
import dataBodyVerifyUtil, { DataBodyVerifyInterface } from "../util/DataBodyVerifyUtil";

const koaRouter: KoaRouter = new KoaRouter();

async function addWhitelist(rs: Rcon, socket: ParameterizedContext, username: string): Promise<void> {
	const whitelist: string = await rs.send("whitelist list");
	const player: boolean = whitelist.includes(":") ? !whitelist.split(": ")[1].split(", ").includes(username) : true;

	if (player) {
		await rs.send(`whitelist add ${username}`);
		logger.info(chalk.green(`用户: [${username}] 添加到白名单成功!`));
		await rs.send("whitelist reload");
		logger.info(chalk.green(`白名单重载中!`));
		socket.body = JSON.stringify({
			code: 200,
			message: "添加白名单成功!",
			data: []
		});
	} else {
		logger.warn(chalk.yellow(`用户: [${username}] 添加到白名单失败, 查看是否重复添加!`));
		socket.body = JSON.stringify({
			code: 400,
			message: "添加白名单失败, 查看是否已经在白名单中!",
			data: []
		});
	}
}

rconService.on("connect", () => logger.info(chalk.green("Rcon 服务器已连接, 正在进行认证")));
rconService.on("authenticated", (): void => {
	logger.info(chalk.green("Rcon 服务器认证成功"));
	logger.info(chalk.red("----------lZiMUl MCWL4W 服务----------\n"));
	koaRouter.post("/whitelist", async (socket: ParameterizedContext): Promise<void> => {
		socket.status = 200;
		socket.type = "application/json";
		const dataBody: DataModuleInterface = socket.request.body as DataModuleInterface;
		const { session, username }: DataModuleInterface = dataBody;
		const { valid, code, message }: DataBodyVerifyInterface = dataBodyVerifyUtil(dataBody);
		if (valid) {
			const { valid, message }: { valid: boolean, message: string } = UsernameValidatorHelper.validate(username);
			if (valid) {
				await addWhitelist(rconService, socket, username);
			} else {
				logger.warn(chalk.yellow(`用户: [${username}] 添加到白名单失败, ${message}!`));
				socket.body = JSON.stringify({
					code: 410,
					message,
					data: []
				});
			}
			GenerateRandomCaptcha.cleanCode(session);
		} else {
			socket.body = JSON.stringify({
				code,
				message,
				data: []
			});
		}
	});
});

export function connectRconServer() {
	rconService.connect();
}

// Export router
export default koaRouter.routes();