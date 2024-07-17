import { UserData } from "../interface/userDataInterface";

declare class UserDataStorage {
	private static UserDataFilePath;
	private static CheckFileExists;

	static get Load(): UserData[];

	static Save(data: UserData): void;
}

export default UserDataStorage;
//# sourceMappingURL=userDataStorage.d.ts.map