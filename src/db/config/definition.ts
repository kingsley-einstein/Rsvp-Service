export interface DbConfig {
  database: string;
  port: number;
  host: string;
  username: string;
  password: string;
  dialect: string;
  define?: {
    underscored?: boolean;
  };
  sync?: {
    force?: boolean;
  }
}