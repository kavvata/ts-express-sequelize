import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

let storage = process.env.SQLITE_STORAGE

if (process.env.NODE_ENV === "test") {
  storage = process.env.TEST_SQLITE_STORAGE
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storage
});
