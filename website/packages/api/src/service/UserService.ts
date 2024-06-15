import _User from '../model/User'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { FindOptions } from 'sequelize/types'
import UserRole from '../model/UserRole'

export interface IUserService {
    get(id: string, email: string): Promise<any>
    getById(id: string): Promise<any>
    getAll(): Promise<any>
    create(data: any): Promise<any>
    remove(id: number): Promise<any>
    search(options?: FindOptions<any>): Promise<any>
}

@injectable()
export default class UserService implements IUserService {
    private User: typeof _User

    public constructor(@inject('User') User: typeof _User) {
        this.User = User
    }

    async get(id: string, email: string) {
        return this.User.findOne({
            where: {
                ...(id ? { id } : {}),
                ...(email ? { email } : {}),
            },
        })
    }

    async getById(id: string) {
        return this.User.findByPk(id)
    }

    async search(options?: FindOptions<any>) {
        return this.User.findOne(options)
    }

    async getAll() {
        return this.User.findAll({
            include: [
                {
                    model: UserRole,
                    as: 'roles',
                },
            ],
            order: [['createdAt', 'DESC']],
        })
    }

    async create(data) {
        return this.User.create(data)
    }

    async remove(id) {
        const result = {
            id,
            success: true,
            message: '',
        }
        console.log(result)
        try {
            const project = await this.User.findByPk(id)
            await project.destroy()
        } catch (e) {
            result.success = false
            result.message = e.message
        }
        return result
    }
}
