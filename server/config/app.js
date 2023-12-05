import dotenv from 'dotenv';

dotenv.config();

class AppConfig {
  constructor() {
    this.env = {
      appUrl: process.env.APP_URL,
      mongoDbUri: process.env.MONGO_DB_URI,
      sessionSecret: process.env.SESSION_SECRET,
      bcryptSalt: process.env.BCRYPT_SALT,
    };
  }

  getEnv() {
    return { ...this.env };
  }
}

const appConfig = new AppConfig();

export default appConfig;
