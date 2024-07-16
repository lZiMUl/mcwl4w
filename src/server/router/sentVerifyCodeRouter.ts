import { ParameterizedContext } from "koa";
import emailService from "../service/emailService";
import GenerateRandomCaptcha from "../util/grcUtil";
import KoaRouter from "koa-router";
import { DataModuleInterface } from "../interface/dataModuleInterface";
import { chalk, logger } from "../helper/helper";
import { getConfig } from "../util/apiUtil";
import { ConfigType } from "../type/serviceType";

const koaRouter: KoaRouter = new KoaRouter();

const configType: ConfigType = "globalConfig";
const [title, verifyCodeExpireTime]: [string, number] = [
	getConfig(configType, "title"),
	emailService.config.verifyCodeExpireTime
];

koaRouter.post(
	"/sentVerifyCode",
	async (socket: ParameterizedContext): Promise<void> => {
		socket.status = 200;
		socket.type = "application/json";

		const target: DataModuleInterface = socket.request
			.body as DataModuleInterface;
		const emailRegex: RegExp =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const verifyCode: string = GenerateRandomCaptcha.generate(
			target.session,
			verifyCodeExpireTime
		);

		try {
			if (emailRegex.test(target.email)) {
				logger.info(
					chalk.green(
						`已向用户 [${target.username} (${target.email})] 发送验证码为 ${verifyCode}`
					)
				);
				await emailService.service.sendMail({
					from: `${title} 服务器 <${emailService.config.username}>`,
					to: target.email,
					subject: `${title} 服务器 - 白名单申请验证码`,
					html: `您好 ${target.username} 玩家, 您的白名单验证码是 [${verifyCode} (${verifyCodeExpireTime}分钟有效)]`
				});
				logger.info(
					chalk.green(
						`已向用户 [${target.username} (${target.email})] 发送验证码为 ${verifyCode}`
					)
				);
				socket.body = JSON.stringify({
					status: true,
					message: "验证码已发送"
				});
			} else {
				logger.warn(
					chalk.yellow(
						`用户 [${target.username} (${target.email})] 邮箱地址不合法`
					)
				);
				socket.body = JSON.stringify({
					status: false,
					message: "邮箱地址不合法"
				});
			}
		} catch (error) {
			logger.error(chalk.red(`邮箱服务配置错误 ${(error as Error).message}`));
			socket.body = JSON.stringify({
				status: false,
				message: "邮箱服务配置错误"
			});
		}
	}
);

export default koaRouter.routes();
