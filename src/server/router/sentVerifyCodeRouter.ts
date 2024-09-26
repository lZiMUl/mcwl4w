import { ParameterizedContext } from 'koa';
import emailService from '../service/emailService';
import GenerateRandomCaptcha from '../util/grcUtil';
import KoaRouter from 'koa-router';
import { DataModuleInterface } from '../interface/dataModuleInterface';
import { chalk, JSONStringify, logger } from '../helper/helper';
import { getConfig } from '../util/apiUtil';
import { ConfigType } from '../type/serviceType';

const koaRouter: KoaRouter = new KoaRouter();

const configType: ConfigType = 'globalConfig';
const [title, verifyCodeExpireTime]: [string, number] = [
  getConfig(configType, 'title'),
  emailService.config.verifyCodeExpireTime
];

koaRouter.post(
  '/sendVerifyCode',
  async (socket: ParameterizedContext): Promise<void> => {
    socket.status = 200;
    socket.type = 'application/json';

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
        await emailService.service.sendMail({
          from: `${title} Server <${emailService.config.username}>`,
          to: target.email,
          subject: `${title} Server - Whitelist Application Verification Code`,
          html: `Hello ${target.username} player, your whitelist verification code is [${verifyCode} (valid for ${verifyCodeExpireTime} minutes)]`
        });
        logger.info(
          chalk.green(
            `Verification code ${verifyCode} has been sent to user [${target.username} (${target.email})]`
          )
        );
        socket.body = JSONStringify({
          status: true,
          message: 'Verification code sent'
        });
      } else {
        logger.warn(
          chalk.yellow(
            `User [${target.username} (${target.email})] has an invalid email address`
          )
        );
        socket.body = JSONStringify({
          status: false,
          message: 'Invalid email address'
        });
      }
    } catch (error) {
      logger.error(
        chalk.red(
          `Email service configuration error: ${(error as Error).message}`
        )
      );
      socket.body = JSONStringify({
        status: false,
        message: 'Email service configuration error'
      });
    }
  }
);

export default koaRouter.routes();
