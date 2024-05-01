import { Transaction } from "sequelize";
import { LogType } from "./LogType";

export interface Logger {
  log(type: LogType, message: string, metadata?: object, transaction?: Transaction): Promise<any>;
}