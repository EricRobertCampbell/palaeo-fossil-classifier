import dotenv from 'dotenv'
import 'reflect-metadata'
import 'moment-timezone'

dotenv.config({ path: '../../.env' })

import { injectable, Container, decorate } from 'inversify'
import { makeLoggerMiddleware } from 'inversify-logger-middleware'
import { Model } from 'sequelize'

import { IServerService } from './service/ServerService'
import sequelize from './database'
import inject from './inject'

import { ILogService } from './service/LogService'
import { Logger } from './log/Logger'
import { LogType } from './log/LogType'
import { DEBUG_INVERSIFY_LOGGER } from './settings'
import { ISeed } from './fixtures/Seed'

decorate(injectable(), Model)

const container = new Container({ defaultScope: 'Singleton' })

if (DEBUG_INVERSIFY_LOGGER) {
    container.applyMiddleware(makeLoggerMiddleware())
}
inject(container)

;(async () => {
    // await sequelize.drop();
    // Note - Super slow with lots of entries
    await sequelize.sync({
        alter: true,
    })

    // Loads required Postgres entries
    const Seed = container.get<ISeed>('ISeed')
    await Seed.run()

    const server = container.get<IServerService>('IServerService')
    server.start()

    // Logger setup
    const logService = container.get<ILogService>('ILogService')
    logService.register(container.get<Logger>('LoggerConsole'), [
        LogType.INFO,
        LogType.ERROR,
        LogType.WARN,
        LogType.TRACE,
    ])

    await logService.info('API is starting up')
})()
