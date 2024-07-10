import { faker } from "@faker-js/faker";

export default class GrcUtil {
	private static CACHE: {} = {};

	public static generate(username: string): number {
		Reflect.set(this.CACHE, username, faker.number.int({ min: 100000, max: 999999 }));
		return this.getCode(username);
	}

	public static getCode(username: string): number {
		return Reflect.get(this.CACHE, username);
	}
}
