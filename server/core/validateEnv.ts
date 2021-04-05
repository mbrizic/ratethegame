import { cleanEnv, port, str, bool } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    POSTGRES_URL: str(),
    JWT_SECRET: str(),
    PORT: port(),
  });
}

export default validateEnv;
