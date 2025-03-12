import { Sequelize } from "sequelize";
import process from "process";
const env = process.env.NODE_ENV || "development";
const config = require("main/database/sequelize.config")[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] ?? "", config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

export default sequelize;
