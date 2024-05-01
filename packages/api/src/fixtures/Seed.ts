import { inject, injectable } from 'inversify';

import { ILogService } from '../service/LogService';

export interface ISeed {
  run(): Promise<any>;
}

@injectable()
export default class Seed implements ISeed {
  private log: ILogService;

  public constructor(
    @inject("ILogService") log: ILogService,
  ) {
    this.log = log;
  }

  async run() {    
    return true;
  }
}
