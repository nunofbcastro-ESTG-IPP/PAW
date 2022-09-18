export class LocalStorageTime {
  public static removeStorage(name: string) {
    try {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '_expiresIn');
    } catch (e) {
      return false;
    }
    return true;
  }

  public static getStorage(key: string) {
    var now = Date.now();

    let expiresIn: number = Number(localStorage.getItem(key + '_expiresIn'));
    if (expiresIn === undefined || expiresIn === null) {
      expiresIn = 0;
    }

    if (expiresIn < now) {
      this.removeStorage(key);
      return null;
    } else {
      try {
        var value = localStorage.getItem(key);
        return value;
      } catch (e) {
        return null;
      }
    }
  }

  public static setStorage(key: string, value: string, expires: number) {
    if (expires === undefined || expires === null) {
      expires = 24 * 60 * 60;
    } else {
      expires = Math.abs(expires);
    }

    let now = Date.now();
    let schedule: number = now + expires * 1000;
    try {
      localStorage.setItem(key, value);
      localStorage.setItem(key + '_expiresIn', `${schedule}`);
    } catch (e) {
      return false;
    }
    return true;
  }
}
