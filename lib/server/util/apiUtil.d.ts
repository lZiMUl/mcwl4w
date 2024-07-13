interface Config {
  [key: string]: string | number;
}

declare function getConfig(
  index: string,
  key: string,
  file?: string
): Config | null;

declare function generateExpireTime(minute: number): Date;

export type { Config };
export { getConfig, generateExpireTime };
//# sourceMappingURL=apiUtil.d.ts.map
