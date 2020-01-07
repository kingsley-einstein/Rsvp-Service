export default class Keys {
  static async hasKeys(body: object, keys: string[]): Promise<boolean> {
    return Object.keys(body).every((bodyKeys) => {
      return keys.some((comparedKeys) => comparedKeys === bodyKeys);
    });
  }
}