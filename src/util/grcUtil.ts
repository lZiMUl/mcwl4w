import { faker } from "@faker-js/faker";

import { VerifyCodeInterface } from "../interface/verifyCodeInterface";
import { generateExpireTime } from "./apiUtil";

export default class GrcUtil {
	private static CACHE: Map<string, VerifyCodeInterface> = new Map();

	public static generate(session: string, minute: number): string {
		this.CACHE.set(session, {
			code: faker.number.int({ min: 100000, max: 999999 }),
			expireTime: generateExpireTime(minute)
		});
		return this.getCode(session);
	}

	public static hasCode(session: string): boolean {
		return this.CACHE.has(session);
	}

	public static getCode(session: string): string {
		return this.CACHE.get(session)?.code.toString() as string;
	}

	public static getExpireTime(session: string): Date {
		return this.CACHE.get(session)?.expireTime as Date;
	}

	public static cleanCode(session: string) {
		this.CACHE.delete(session);
	}
}
