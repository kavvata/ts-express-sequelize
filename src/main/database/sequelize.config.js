import dotenv from 'dotenv'

dotenv.config()

export default {
  "development": {
    "storage": process.env.SQLITE_STORAGE,
    "dialect": "sqlite"
  },
  "test": {
    "storage": process.env.TEST_SQLITE_STORAGE,
    "dialect": "sqlite",
    "logging": false
  },
  "production": {
    "storage": process.env.SQLITE_STORAGE,
    "dialect": "sqlite"
  }
}
