import { LogType } from "./LogType";
import { Logger } from "./Logger";

export type LoggerConfig = {
  logger: Logger;
  logTypes: LogType[];
};