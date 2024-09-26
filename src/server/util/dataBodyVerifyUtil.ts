import { DataModuleInterface } from '../interface/dataModuleInterface';
import GenerateRandomCaptcha from './grcUtil';
import { chalk, logger } from '../helper/helper';
import { DataBodyVerifyInterface } from '../interface/dataBodyVerifyInterface';
import userDataStorage from './userDataStorageUtil';
import { UserData } from '../interface/userDataInterface';

export default function ({
  session,
  username,
  email,
  verifyCode
}: DataModuleInterface): DataBodyVerifyInterface {
  if (!session) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Client illegal; data submission, no [Session] parameter provided`
      )
    );
    return {
      valid: false,
      code: 410,
      message: 'Illegal data submission, no [Session] parameter provided'
    };
  }
  if (!username) {
    logger.warn(
      chalk.yellow(
        `User: [Unknown] Client illegal data submission, no [Username] provided`
      )
    );
    return {
      valid: false,
      code: 420,
      message: 'Illegal data submission, please provide [Username]'
    };
  }
  if (!email) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Client illegal data submission, no [Email] provided`
      )
    );
    return {
      valid: false,
      code: 430,
      message: 'Illegal data submission, please provide [Email]'
    };
  }
  if (!verifyCode) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Client illegal data submission, no [Verification Code] provided`
      )
    );
    return {
      valid: false,
      code: 440,
      message: 'Illegal data submission, please provide [Verification Code]'
    };
  }
  if (!GenerateRandomCaptcha.hasCode(session)) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Client illegal data submission, no verification code sent before data submission`
      )
    );
    return {
      valid: false,
      code: 450,
      message: 'No verification code sent before data submission'
    };
  }
  if (verifyCode !== GenerateRandomCaptcha.getCode(session)) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Failed to add to whitelist, incorrect verification code entered [${verifyCode}]`
      )
    );
    return {
      valid: false,
      code: 460,
      message: 'Incorrect verification code'
    };
  }
  if (new Date() > GenerateRandomCaptcha.getExpireTime(session)) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Verification code expired, ${verifyCode}!`
      )
    );
    return {
      valid: false,
      code: 470,
      message: 'Verification code has expired'
    };
  }
  const uds: UserData | undefined = userDataStorage.Load.find(
    ({ email: userDataStorageEmail }: UserData): boolean =>
      userDataStorageEmail === email
  );
  if (uds) {
    logger.warn(
      chalk.yellow(
        `User: [${username}] Email binding error, the [${uds.email}] email is already bound to user [${uds.username}], cannot bind again`
      )
    );
    return {
      valid: false,
      code: 480,
      message: `The [${email}] email is already bound to user [${username}], cannot bind again`
    };
  }
  logger.info(chalk.green(`User: [${username}] All client data checks passed`));
  return {
    valid: true,
    code: 400,
    message: 'Client data validation successful'
  };
}

export type { DataBodyVerifyInterface };
