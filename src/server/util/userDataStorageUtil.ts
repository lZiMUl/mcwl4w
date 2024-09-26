import { existsSync, writeFileSync } from 'node:fs';
import pathUtil from './pathUtil';
import { readFileSync } from 'fs';
import { UserData } from '../interface/userDataInterface';
import { JSONStringify } from '../helper/helper';

class UserDataStorageUtil {
  private static UserDataFilePath: string = pathUtil('./config/userData.json');

  public static get Load(): UserData[] {
    this.CheckFileExists();
    return JSON.parse(
      readFileSync(UserDataStorageUtil.UserDataFilePath, {
        flag: 'r',
        encoding: 'utf-8'
      })
    );
  }

  public static Save(data: UserData): void {
    const cacheData: UserData[] = this.Load;
    cacheData.push(data);
    writeFileSync(
      UserDataStorageUtil.UserDataFilePath,
      JSONStringify(cacheData)
    );
  }

  private static CheckFileExists(): void {
    if (!existsSync(UserDataStorageUtil.UserDataFilePath)) {
      writeFileSync(UserDataStorageUtil.UserDataFilePath, JSONStringify([]));
    }
  }
}

export default UserDataStorageUtil;
