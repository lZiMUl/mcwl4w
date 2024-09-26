import { UserData } from '../interface/userDataInterface';
declare class UserDataStorageUtil {
    private static UserDataFilePath;
    static get Load(): UserData[];
    static Save(data: UserData): void;
    private static CheckFileExists;
}
export default UserDataStorageUtil;
//# sourceMappingURL=userDataStorageUtil.d.ts.map