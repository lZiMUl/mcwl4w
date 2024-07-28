import { Rcon } from 'rcon-client';
import { getConfig } from '../util/apiUtil';
import { ServiceType } from '../type/serviceType';

const serviceType: ServiceType = 'rconService';

const [host, port, password]: [string, number, string] = [
  getConfig(serviceType, 'host') ?? '127.0.0.1',
  getConfig(serviceType, 'port') ?? 25575,
  getConfig(serviceType, 'password') ?? ''
];

export default new Rcon({ host, port, password });
