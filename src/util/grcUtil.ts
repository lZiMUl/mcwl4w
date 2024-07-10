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

	public static cleanCode(username: string) {
		this.CACHE = Reflect.ownKeys(this.CACHE)
			.filter((key: string | symbol): boolean => username !== key)
			.reduce((newData: {}, key: string | symbol) => {
					Reflect.set(newData, key, Reflect.get(this.CACHE, key));
					return newData;
				}, {}
			);
	}
}
