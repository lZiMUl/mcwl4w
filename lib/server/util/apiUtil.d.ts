import ConfigInterface from '../interface/ConfigInterface';
declare function getConfig<T extends keyof ConfigInterface, K extends keyof ConfigInterface[T]>(index: T, key: K, file?: string): ConfigInterface[T][K];
declare function generateExpireTime(minute: number): Date;
export { getConfig, generateExpireTime };
//# sourceMappingURL=apiUtil.d.ts.map