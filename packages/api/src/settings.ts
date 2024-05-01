import * as env from 'env-var';

export const BASE_DIR = __dirname;

export const NODE_ENV = env.get('NODE_ENV').default('production').asString();
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TESTING = NODE_ENV === 'testing';
export const IS_PRODUCTION = NODE_ENV === 'production' || !NODE_ENV;

export const PORT = env.get('PORT').default(3001).asString();

export const DATABASE_USERNAME = env.get('DATABASE_USERNAME').required().asString();
export const DATABASE_PASSWORD = env.get('DATABASE_PASSWORD').required().asString();
export const DATABASE_HOST = env.get('DATABASE_HOST').required().asString();
export const DATABASE_NAME = env.get('DATABASE_NAME').required().asString();
export const DATABASE_LOGGING_ENABLED = env.get('DATABASE_LOGGING_ENABLED').default(`${ IS_DEVELOPMENT }`).asBool();

export const SMTP_HOST = env.get('SMTP_HOST').asString();
export const SMTP_PORT = env.get('SMTP_PORT').default(465).asString();
export const SMTP_USERNAME = env.get('SMTP_USERNAME').asString();
export const SMTP_PASSWORD = env.get('SMTP_PASSWORD').asString();

export const SESSION_SECRET = env.get('SESSION_SECRET').default('keyboard cat').asString();
export const CORS_ORIGIN = env.get('CORS_ORIGIN').default('*').asString();

export const DEBUG_INVERSIFY_LOGGER = env.get('DEBUG_INVERSIFY_LOGGER').default('false').asBool();
