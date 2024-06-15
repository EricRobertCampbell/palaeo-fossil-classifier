import dotenv from 'dotenv'
import env from 'env-var'

dotenv.config({ path: '../../.env' })

export const ENV_PREFIX = env
    .get('FRONTEND_ENV_PREFIX')
    .default('FRONTEND_')
    .asString()
export const NODE_ENV = env.get('NODE_ENV').default('production').asString()

export const IS_DEVELOPMENT = NODE_ENV === 'development'
export const IS_TESTING = NODE_ENV === 'testing'
export const IS_PRODUCTION = NODE_ENV === 'production' || !NODE_ENV

export const PORT = env.get(`${ENV_PREFIX}PORT`).default(3000).asIntPositive()
export const API_ENDPOINT = env
    .get(`${ENV_PREFIX}API_ENDPOINT`)
    .default('localhost:3001')
    .asString()

export const DATABASE_DIALECT = env
    .get('DATABASE_DIALECT')
    .required()
    .asString()
export const DATABASE_STORAGE = env
    .get('DATABASE_STORAGE')
    .default('../../database.sqlite')
    .asString()
export const DATABASE_USERNAME = env.get('DATABASE_USERNAME').asString()
export const DATABASE_PASSWORD = env.get('DATABASE_PASSWORD').asString()
export const DATABASE_HOST = env.get('DATABASE_HOST').asString()
export const DATABASE_NAME = env.get('DATABASE_NAME').asString()

// Expose so package 'next-runtime-env' can pick them up and send them to client side
process.env['NEXT_PUBL' + 'IC_NODE_ENV'] = NODE_ENV
process.env['NEXT_PUBL' + 'IC_API_ENDPOINT'] = API_ENDPOINT
