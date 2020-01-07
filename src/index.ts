import express from "express";
import morgan from "morgan";
import { CloudConfig, EurekaClient } from "./cloud";
import configure from "./config";
import env from "./env";
import db from "./db";

const { cloud, port } = env;
const { sequelize } = db;

const config = (cb: any) => {
  cb(morgan, express);
};

const loadCloudConfigAndEureka = async () => {
  const c = await CloudConfig.loadConfig(cloud);
  const eureka = await EurekaClient.loadEureka({
    instance: {
      app: c.get("eureka.instance.app"),
      instanceId: `${c.get("eureka.instance.app")}:${port}`,
      hostName: c.get("eureka.instance.hostname"),
      ipAddr: c.get("eureka.instance.hostname"),
      statusPageUrl: c.get("eureka.instance.statusPage"),
      healthCheckUrl: c.get("eureka.instance.healthCheck"),
      vipAddress: c.get("eureka.instance.vipAddress"),
      port: {
        "$": parseInt(port),
        "@enabled": true
      },
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn"
      }
    },
    eureka: {
      serviceUrls: {
        default: [
          `${c.get("eureka.client.url")}/eureka/apps`
        ]
      }
    }
  });

  eureka.start((err) => {
    if (err) throw err;
  });
};

const app = express();

config(configure(app));

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  const s = await sequelize.sync({});
  if (s) console.log("Sequelize sync complete");
  await loadCloudConfigAndEureka();
});
