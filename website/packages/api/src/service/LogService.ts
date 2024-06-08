import { injectable } from 'inversify';
import 'reflect-metadata';
import { Transaction } from 'sequelize/types';
import { Logger } from '../log/Logger';
import { LoggerConfig } from '../log/LoggerConfig';
import { LogType } from '../log/LogType';

export interface ILogService {
  register(logger: Logger, logTypes: LogType[]): any;
  trace(message: string, metadata?: object, transaction?: Transaction): Promise<any>;
  warn(message: string, metadata?: object, transaction?: Transaction): Promise<any>;
  info(message: string, metadata?: object, transaction?: Transaction): Promise<any>;
  error(message: string, metadata?: object, transaction?: Transaction): Promise<any>;
}

@injectable()
export default class LogService implements ILogService {
  private loggers: LoggerConfig[];

  public constructor() {
    this.loggers = [];
  }

  register(logger: Logger, logTypes: LogType[]) {
    this.loggers = [
      ...this.loggers,
      {
        logger,
        logTypes,
      },
    ];
  }

  private async log(type: LogType, message: string, metadata?: object, transaction?: Transaction) {
    for (const logger of this.loggers) {
      if (logger.logTypes.indexOf(type) === -1) {
        continue;
      }
      await logger.logger.log(type, message, metadata, transaction);
    }
    return;
  }

  async info(message: string, metadata?: object, transaction?: Transaction) {
    return this.log(LogType.INFO, message, metadata, transaction); 
  }

  async trace(message: string, metadata?: object, transaction?: Transaction) {
    return this.log(LogType.TRACE, message, metadata, transaction); 
  }

  async warn(message: string, metadata?: object, transaction?: Transaction) {
    return this.log(LogType.WARN, message, metadata, transaction); 
  }

  async error(message: string, metadata?: object, transaction?: Transaction) {
    return this.log(LogType.ERROR, message, metadata, transaction); 
  }
}
