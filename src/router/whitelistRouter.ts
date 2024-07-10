import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import { Rcon } from "rcon-client";

import rconServer from "../server/rconServer";
import { chalk, logger } from "../helper/helper";
import UsernameValidatorHelper from "../helper/usernameValidatorHelper";
import { DataModule } from "../interface/dataModuleInterface";
import GenerateRandomCaptcha from "../util/grcUtil";

const koaRouter: KoaRouter = new KoaRouter();

rconServer.on("connect", () => logger.info(chalk.green("Rcon 服务器已连接")));
rconServer.on("authenticated", () => logger.info(chalk.green("Rcon 服务器认证成功\n")));

const rs: Promise<Rcon> = rconServer.connect();

async function addWhitelist(socket: ParameterizedContext, username: string): Promise<void> {
	const whitelist: string = await (await rs).send("whitelist list");
	const player: boolean = whitelist.includes(":") ? !whitelist.split(": ")[1].split(", ").includes(username) : true;

	if (player) {
		await (await rs).send(`whitelist add ${username}`);
		logger.info(chalk.green(`用户: [${username}] 添加到白名单成功!`));
		await (await rs).send("whitelist reload");
		logger.info(chalk.green(`白名单重载中!`));
		socket.body = JSON.stringify({
			code: 200,
			message: "添加白名单成功!",
			data: []
		});
	} else {
		logger.error(chalk.red(`用户: [${username}] 添加到白名单失败, 查看是否重复添加!`));
		socket.body = JSON.stringify({
			code: 400,
			message: "添加白名单失败, 查看是否已经在白名单中!",
			data: []
		});
	}
}

koaRouter.post("/whitelist", async (socket: ParameterizedContext): Promise<void> => {
	socket.status = 200;
	socket.type = "text/html";
	const { username, email, verifyCode }: DataModule = socket.request.body as DataModule;
	if (username && email && verifyCode) {
		try {
			if (verifyCode === GenerateRandomCaptcha.getCode(username).toString()) {
				const { valid, message }: { valid: boolean, message: string } = UsernameValidatorHelper.validate(username);
				if (valid) {
					await addWhitelist(socket, username);
				} else {
					logger.error(chalk.red(`用户: [${username}] 添加到白名单失败, ${message}!`));
					socket.body = JSON.stringify({
						code: 410,
						message,
						data: []
					});
				}
				GenerateRandomCaptcha.cleanCode(username);
			} else {
				logger.error(chalk.red(`用户: [${username}] 添加到白名单失败, 输入错误验证码 [${verifyCode}]`));
				socket.body = JSON.stringify({
					code: 420,
					message: "验证码错误",
					data: []
				});
			}
		} catch (err) {
			logger.warn("客户端未发送验证码进行提交数据, 已被忽略");
			socket.body = JSON.stringify({
				code: 430,
				message: "非法操作, 未发送验证码进行提交数据, 已忽略请求",
				data: []
			});
		}
	} else {
		logger.error(chalk.red(`用户: [${username}] 添加到白名单失败, 客户端非法数据提交`));
		socket.body = JSON.stringify({
			code: 440,
			message: "非法数据提交",
			data: []
		});
	}
});

// Export router
export default koaRouter.routes();