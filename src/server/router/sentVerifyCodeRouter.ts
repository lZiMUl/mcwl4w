import { ParameterizedContext } from "koa";
import emailService from "../service/emailService";
import GenerateRandomCaptcha from "../util/grcUtil";
import KoaRouter from "koa-router";
import { DataModuleInterface } from "../interface/dataModuleInterface";
import { chalk, logger } from "../helper/helper";

const koaRouter: KoaRouter = new KoaRouter();

koaRouter.post("/sentVerifyCode", async (socket: ParameterizedContext): Promise<void> => {
	socket.status = 200;
	socket.type = "application/json";

	const target: DataModuleInterface = socket.request.body as DataModuleInterface;
	const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const verifyCode: string = GenerateRandomCaptcha.generate(target.session, 5);

	try {
		if (emailRegex.test(target.email)) {
			await emailService.service.sendMail({
				from: `MineCraft 服务器 <${emailService.config.username}>`,
				to: target.email,
				subject: "MineCraft 服务器 - 白名单申请验证码",
				html: `您好 ${target.username} 玩家, 您的白名单验证码是 [${verifyCode} (5分钟有效)]`
			});
			logger.info(chalk.green(`已向用户 [${target.username} (${target.email})] 发送验证码为 ${verifyCode}`));
			socket.body = JSON.stringify({
				status: true,
				message: "验证码已发送"
			});
		} else {
			logger.warn(chalk.yellow(`用户 [${target.username} (${target.email})] 邮箱地址不合法`));
			socket.body = JSON.stringify({
				status: false,
				message: "邮箱地址不合法"
			});
		}
	} catch (error) {
		logger.error(chalk.red(`服务器邮箱配置出现问题 ${(error as Error).message}`));
		socket.body = JSON.stringify({
			status: false,
			message: "服务器邮箱配置出现问题"
		});
	}
});

export default koaRouter.routes();
