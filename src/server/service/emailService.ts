import nodemailer from 'nodemailer';
import { getConfig } from '../util/apiUtil';
import { ServiceType } from '../type/serviceType';

const serviceType: ServiceType = 'emailService';

export const [host, port, username, password, verifyCodeExpireTime]: [
  string,
  number,
  string,
  string,
  number
] = [
  getConfig(serviceType, 'host') ?? '127.0.0.1',
  getConfig(serviceType, 'port') ?? 587,
  getConfig(serviceType, 'username') ?? '',
  getConfig(serviceType, 'password') ?? '',
  getConfig(serviceType, 'verifyCodeExpireTime') ?? 5
];

export default {
  config: {
    host,
    port,
    username,
    password,
    verifyCodeExpireTime
  },
  service: nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user: username,
      pass: password
    }
  })
};
