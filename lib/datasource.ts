import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "./checkpoint2.db",
  synchronize: true,
  entities: ["src/entities.ts"],
  logging: ["query", "error"],
});