interface Config {
    [key: string]: any;
}
declare function getConfig(index: string, key: string, file?: string): (Config | null);
declare function generateExpireTime(minute: number): Date;
export type { Config };
export { getConfig, generateExpireTime };
//# sourceMappingURL=apiUtil.d.ts.map