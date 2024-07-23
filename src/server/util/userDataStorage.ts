import { existsSync, writeFileSync } from 'node:fs';
import pathUtil from './pathUtil';
import { readFileSync } from 'fs';
import { UserData } from '../interface/userDataInterface';
import { JSONStringify } from '../helper/helper';

class UserDataStorage {
  private static UserDataFilePath: string = pathUtil('./config/userData.json');

  public static get Load(): UserData[] {
    this.CheckFileExists();
    return JSON.parse(
      readFileSync(UserDataStorage.UserDataFilePath, {
        flag: 'r',
        encoding: 'utf-8'
      })
    );
  }

  public static Save(data: UserData): void {
    const cacheData: UserData[] = this.Load;
    cacheData.push(data);
    writeFileSync(UserDataStorage.UserDataFilePath, JSONStringify(cacheData));
  }

  private static CheckFileExists(): void {
    if (!existsSync(UserDataStorage.UserDataFilePath)) {
      writeFileSync(UserDataStorage.UserDataFilePath, JSONStringify([]));
    }
  }
}

export default UserDataStorage;
