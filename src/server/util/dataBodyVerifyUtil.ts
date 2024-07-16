import { DataModuleInterface } from "../interface/dataModuleInterface";
import GenerateRandomCaptcha from "./grcUtil";
import { chalk, logger } from "../helper/helper";
import { DataBodyVerifyInterface } from "../interface/dataBodyVerifyInterface";
import userDataStorage from "./userDataStorage";
import { UserData } from "../interface/userDataInterface";

export default function({
																									session,
																									username,
																									email,
																									verifyCode
																								}: DataModuleInterface): DataBodyVerifyInterface {
	if (!session) {
		logger.warn(
			chalk.yellow(
				`用户: [${username}] 客户端非法;数据提交, 未提供 [Session] 参数`
			)
		);
		return {
			valid: false,
			code: 410,
			message: "非法数据提交, 未提供 [Session] 参数"
		};
	}
	if (!username) {
		logger.warn(
			chalk.yellow(`用户: [未知] 客户端非法数据提交, 未填写 [用户名]`)
		);
		return {
			valid: false,
			code: 420,
			message: "非法数据提交, 请填写 [用户名]"
		};
	}
	if (!email) {
		logger.warn(
			chalk.yellow(`用户: [${username}] 客户端非法数据提交, 未填写 [邮箱]`)
		);
		return {
			valid: false,
			code: 430,
			message: "非法数据提交, 请填写 [邮箱]"
		};
	}
	if (!verifyCode) {
		logger.warn(
			chalk.yellow(`用户: [${username}] 客户端非法数据提交, 未填写 [验证码]`)
		);
		return {
			valid: false,
			code: 440,
			message: "非法数据提交, 请填写 [验证码]"
		};
	}
	if (!GenerateRandomCaptcha.hasCode(session)) {
		logger.warn(
			chalk.yellow(
				`用户: [${username}] 客户端非法数据提交, 未发送验证码 进行数据提交`
			)
		);
		return {
			valid: false,
			code: 450,
			message: "未发送验证码 进行数据提交"
		};
	}
	if (verifyCode !== GenerateRandomCaptcha.getCode(session)) {
		logger.warn(
			chalk.yellow(
				`用户: [${username}] 添加到白名单失败, 输入错误验证码 [${verifyCode}]`
			)
		);
		return {
			valid: false,
			code: 460,
			message: "验证码错误"
		};
	}
	if (new Date() > GenerateRandomCaptcha.getExpireTime(session)) {
		logger.warn(
			chalk.yellow(`用户: [${username}] 验证码已过期, ${verifyCode}!`)
		);
		return {
			valid: false,
			code: 470,
			message: "验证码已过期"
		};
	}
	const uds: UserData | undefined = userDataStorage.Load.find(
		({ email: userDataStorageEmail }: UserData): boolean =>
			userDataStorageEmail === email
	);
	if (uds) {
		logger.warn(
			chalk.yellow(
				`用户: [${username}] 邮箱绑定错误, 该 [${uds.email}] 邮箱已经绑定用户为 [${uds.username}], 无法重复绑定`
			)
		);
		return {
			valid: false,
			code: 480,
			message: `该 [${email}] 邮箱已经绑定用户为 [${username}], 无法重复绑定`
		};
	}
	logger.info(chalk.green(`用户: [${username}] 客户端所有数据检查通过`));
	return {
		valid: true,
		code: 400,
		message: "客户端数据验证成功"
	};
}

export type { DataBodyVerifyInterface };
