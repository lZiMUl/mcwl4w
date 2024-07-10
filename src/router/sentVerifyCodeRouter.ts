import { ParameterizedContext } from "koa";
import emailService from "../service/emailService";
import GenerateRandomCaptcha from "../util/grcUtil";
import KoaRouter from "koa-router";
import { DataModule } from "../interface/dataModuleInterface";

const koaRouter: KoaRouter = new KoaRouter();

koaRouter.post("/sentVerifyCode", async (socket: ParameterizedContext): Promise<void> => {
	const target: string = (socket.request.body as DataModule).email;
	const verifyCode: number = GenerateRandomCaptcha.generate((socket.request.body as DataModule).username);
	await emailService.service.sendMail({
		from: emailService.config.user,
		to: target,
		subject: "服务器验证码",
		text: verifyCode.toString(),
		html: verifyCode.toString()
	});
});

export default koaRouter.routes();