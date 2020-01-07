if (process.env.NODE_ENV !== "production") {
  require("dotenv")
    .config();
}

export default {
  port: process.env.PORT,
  db: {
    production: {
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME
    },
    development: {
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME
    }
  },
  services: {
    auth: process.env.AUTH_SERVICE
  },
  cloud: {
    endpoint: process.env.CLOUD_ENDPOINT,
    name: process.env.CLOUD_NAME,
    profiles: process.env.CLOUD_PROFILES
  }
}
