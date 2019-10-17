class LocalStorageService {
  private static codeKey = 'BEAT_CODE';

  public static saveCode(beatCode: string) {
    localStorage.setItem(this.codeKey, beatCode);
  }

  public static loadCode(): string {
    return localStorage.getItem(this.codeKey);
  }

  public static hasCode(): boolean {
    return localStorage.getItem(this.codeKey) !== null;
  }
}

export default LocalStorageService;
