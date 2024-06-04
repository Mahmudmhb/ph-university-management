import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_DEVELOPMENT,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
};
