import { ParameterizedContext } from "koa";
import emailService from "../service/emailService";
import GenerateRandomCaptcha from "../util/grcUtil";
import KoaRouter from "koa-router";
import { DataModule } from "../interface/dataModuleInterface";

const koaRouter: KoaRouter = new KoaRouter();

koaRouter.post("/sentVerifyCode", async (socket: ParameterizedContext): Promise<void> => {
	const target: string = (socket.request.body as DataModule).email;
	const verifyCode: number = GenerateRandomCaptcha.generate((socket.request.body as DataModule).username);
	console.info(target, verifyCode);
	await emailService.service.sendMail({
		from: emailService.config.user, // sender address
		to: target, // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: verifyCode.toString() // html body
	});
});

export default koaRouter.routes();