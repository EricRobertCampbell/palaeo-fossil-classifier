import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import SequelizeAdapter from '@auth/sequelize-adapter'
import { Sequelize, Dialect } from 'sequelize'
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
    DATABASE_DIALECT,
    DATABASE_STORAGE,
} from './lib/settings'

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: DATABASE_DIALECT as Dialect,
        storage: DATABASE_STORAGE,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            underscored: true,
        },
        logging: false,
        // logging: DATABASE_LOGGING_ENABLED ? console.log : false,
        // logging,
        // benchmark: true,
    }
)

// const pool = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

export const config = {
    adapter: SequelizeAdapter(sequelize),
    theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
    providers: [GitHub],
    basePath: '/auth',
    callbacks: {
        authorized({ request, auth }) {
            console.log('request', request)
            // when is this even called?
            const { pathname } = request.nextUrl
            if (pathname === '/middleware-example') return !!auth
            return true
        },
        jwt({ token, trigger, session, user }) {
            if (trigger === 'update') {
                token.name = session.user.name
            }
            return token
        },
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, token, user }) {
            console.log('session', session)
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
