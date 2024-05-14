import * as env from 'env-var';

export const BASE_DIR = __dirname;

export const ENV_PREFIX = env.get('API_ENV_PREFIX').default('').asString();
export const NODE_ENV = env.get('NODE_ENV').default('production').asString();
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TESTING = NODE_ENV === 'testing';
export const IS_PRODUCTION = NODE_ENV === 'production' || !NODE_ENV;

export const PORT = env.get(`${ENV_PREFIX}PORT`).default(3001).asString();

export const DATABASE_DIALECT = env.get(`${ENV_PREFIX}DATABASE_DIALECT`).required().asString();
export const DATABASE_STORAGE = env.get(`${ENV_PREFIX}DATABASE_STORAGE`).default('../../database.sqlite').asString();
export const DATABASE_USERNAME = env.get(`${ENV_PREFIX}DATABASE_USERNAME`).required().asString();
export const DATABASE_PASSWORD = env.get(`${ENV_PREFIX}DATABASE_PASSWORD`).required().asString();
export const DATABASE_HOST = env.get(`${ENV_PREFIX}DATABASE_HOST`).required().asString();
export const DATABASE_NAME = env.get(`${ENV_PREFIX}DATABASE_NAME`).required().asString();
export const DATABASE_LOGGING_ENABLED = env.get(`${ENV_PREFIX}DATABASE_LOGGING_ENABLED`).default(`${ IS_DEVELOPMENT }`).asBool();

export const SESSION_SECRET = env.get(`${ENV_PREFIX}SESSION_SECRET`).default('keyboard cat').asString();
export const CORS_ORIGIN = env.get(`${ENV_PREFIX}CORS_ORIGIN`).default('*').asString();

export const DEBUG_INVERSIFY_LOGGER = env.get(`${ENV_PREFIX}DEBUG_INVERSIFY_LOGGER`).default('false').asBool();
