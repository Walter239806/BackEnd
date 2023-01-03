import dotEnv from 'dotenv'

dotEnv.config()

const { APP_NAME, APP_VERSION, NODE_ENV, NODE_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, JWTSecret, TEST_USERNAME, TEST_PW } = process.env

console.log('testing.js*******', TEST_USERNAME)
export default {
  APP_NAME,
  APP_VERSION,
  NODE_ENV,
  NODE_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWTSecret,
  TEST_USERNAME,
  TEST_PW
}
