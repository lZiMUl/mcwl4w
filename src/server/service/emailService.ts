import nodemailer from 'nodemailer';
import { getConfig } from '../util/apiUtil';
import { ServiceType } from '../type/serviceType';

const serviceType: ServiceType = 'emailService';

export const [host, port, username, password]: [
  string,
  number,
  string,
  string
] = [
  getConfig(serviceType, 'host') ?? '127.0.0.1',
  getConfig(serviceType, 'port') ?? 587,
  getConfig(serviceType, 'username') ?? '',
  getConfig(serviceType, 'password') ?? ''
];

export default {
  config: {
    host,
    port,
    username,
    password,
    verifyCodeExpireTime: getConfig(serviceType, 'verifyCodeExpireTime') ?? 5
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
