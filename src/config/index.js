import dotEnv from "dotenv";

dotEnv.config();

const {

    APP_NAME,
    APP_VERSION,
    NODE_ENV,
    NODE_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,

} = process.env;

export default {

    APP_NAME,
    APP_VERSION,
    NODE_ENV,
    NODE_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,

};