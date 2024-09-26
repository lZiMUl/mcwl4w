import { Rcon } from 'rcon-client';
import { getConfig } from '../util/apiUtil';
import { ServiceType } from '../type/serviceType';

const serviceType: ServiceType = 'rconService';

export default new Rcon({
  host: getConfig(serviceType, 'host') ?? '127.0.0.1',
  port: getConfig(serviceType, 'port') ?? 25575,
  password: getConfig(serviceType, 'password') ?? ''
});
