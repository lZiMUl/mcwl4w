import { UserData } from "../interface/userDataInterface";
declare class UserDataStorage {
    private static UserDataFilePath;
    static get Load(): UserData[];
    static Save(data: UserData): void;
    private static CheckFileExists;
}
export default UserDataStorage;
//# sourceMappingURL=userDataStorage.d.ts.map