import Config from "cloud-config-client";

export default class CloudConfig {
  static async loadConfig({ endpoint, name, profiles }): Promise<any> {
    return Config.load({ endpoint, name, profiles });
  }
}
