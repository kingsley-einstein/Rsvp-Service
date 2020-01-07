import { Eureka } from "eureka-js-client";

export default class EurekaClient {
  static async loadEureka(config: any) {
    return new Eureka(config);
  }
}
