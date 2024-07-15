import { readFileSync } from 'fs';
import { parse } from 'toml';
import absolutePath from './pathUtil';
import ConfigInterface from '../interface/ConfigInterface';

// Read configuration data
function getConfig<
  T extends keyof ConfigInterface,
  K extends keyof ConfigInterface[T]
>(index: T, key: K, file?: string): ConfigInterface[T][K] {
  const parseData = parse(
    readFileSync(
      absolutePath(`./config/${file ? file : 'default'}.toml`),
      'utf-8'
    )
  );
  return Reflect.get(Reflect.get(parseData, index), key);
}

function generateExpireTime(minute: number): Date {
  const nowTime: Date = new Date();
  return new Date(nowTime.setMinutes(nowTime.getMinutes() + minute));
}

// Export api
export { getConfig, generateExpireTime };
