import _Session from '../model/Session'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import User from '../model/User'
import UserRole from '../model/UserRole'

export interface ISessionService {
    getByToken(sessionToken: string): Promise<any>
}

@injectable()
export default class SessionService implements ISessionService {
    private Session: typeof _Session

    public constructor(@inject('Session') Session: typeof _Session) {
        this.Session = Session
    }

    async getByToken(sessionToken: string) {
        return this.Session.findOne({
            where: {
                sessionToken,
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    include: [
                        {
                            model: UserRole,
                            as: 'roles',
                        },
                    ],
                },
            ],
        })
    }
}
