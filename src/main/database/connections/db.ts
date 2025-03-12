import { Sequelize } from "sequelize";
import process from "process";

const env = process.env.NODE_ENV || "development";
const config = require("main/database/sequelize.config")[env];

export const sequelize = config.use_env_variable
  ? new Sequelize(config)
  : new Sequelize(config.database, config.username, config.password, config);
