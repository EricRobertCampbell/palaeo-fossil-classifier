import { inject, injectable } from 'inversify'

import { ILogService } from '../service/LogService'
import _Role from '../model/Role'

export interface ISeed {
    run(): Promise<any>
}

@injectable()
export default class Seed implements ISeed {
    private log: ILogService
    private Role: typeof _Role

    public constructor(
        @inject('ILogService') log: ILogService,
        @inject('Role') Role: typeof _Role
    ) {
        this.log = log
        this.Role = Role
    }

    async run() {
        const roles = [
            {
                id: 'USER',
                description: '',
            },
            {
                id: 'ADMIN',
                description: '',
            },
        ]
        for (const role of roles) {
            try {
                await this.Role.create(role)
            } catch (e) {}
        }

        return true
    }
}
