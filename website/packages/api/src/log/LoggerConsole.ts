import { Logger } from './Logger'
import { injectable } from 'inversify'
import { LogType } from './LogType'

@injectable()
export class LoggerConsole implements Logger {
    async log(type: LogType, message: string) {
        if (!message) {
            return
        }
        console.log(`[${type}]`, message)
    }
}
