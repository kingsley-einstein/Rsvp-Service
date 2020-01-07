import { DbConfig } from "./definition";
import env from "../../env";

const { db } = env;

const development: DbConfig = {
  username: db.development.username,
  password: db.development.password,
  port: parseInt(db.development.port),
  host: db.development.host,
  dialect: "postgres",
  database: db.development.name,
  define: {
    underscored: true
  },
  sync: {
    force: false
  }
};

const production: DbConfig = {
  username: db.production.username,
  password: db.production.password,
  port: parseInt(db.production.port),
  host: db.production.host,
  dialect: "postgres",
  database: db.production.name,
  define: {
    underscored: true
  },
  sync: {
    force: false
  }
};

export default { development, production };
