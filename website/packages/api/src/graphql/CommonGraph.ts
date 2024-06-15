import { inject, injectable } from 'inversify'

import { IPubSubService } from '../service/PubSubService'
import { ILogService } from '../service/LogService'
import { IGraphBuilder } from './IGraphBuilder'
import { IUserService } from '../service/UserService'
import { ISessionService } from '../service/SessionService'
import moment from 'moment'
import _ from 'lodash'
import { hasRoles, isAuthenticated } from '../lib/utils'

export const typeDef = `
  type SimpleResult {
    id: ID
    error: Boolean!
    message: String
  }

  type Sample {
    id: ID!
    imageUrl: String!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: Boolean!
    roles: [String]
  }

  extend type Query {
    users: [User]
    user(id: ID, email: String): User
    samples(
      isClassified: Boolean!,
      limit: Int,
      offset: Int,
      sortColumn: Int,
      sortOrder: Int
    ): [Sample]
  }

  extend type Mutation {
    userRegister(
      id: String!,
      email: String!,
      name: String!
    ): SimpleResult

    sampleClassify(
      userId: ID!,
      hasFossil: Boolean!,
      imageId: ID!
    ): SimpleResult
  }
`

@injectable()
export default class CommonGraph implements IGraphBuilder {
    private pubSubService: IPubSubService
    private log: any
    private userService: IUserService
    private sessionService: ISessionService

    public constructor(
        @inject('IPubSubService') pubSubService: IPubSubService,
        @inject('ILogService') log: ILogService,
        @inject('IUserService') userService: IUserService
    ) {
        this.pubSubService = pubSubService
        this.log = log
        this.userService = userService
    }

    build() {
        const resolvers = {
            Query: {
                user: [
                    async (a, { id, email }, context) => {
                        console.log(a, context)
                        const users = await this.userService.get(id, email)
                        return users
                    },
                ],
                users: [
                    isAuthenticated,
                    hasRoles(['ADMIN']),
                    async (_, [a, args, context]) => {
                        // const [,, { session }] = args;
                        const users = (await this.userService.getAll()).map(
                            (user) => {
                                console.log(user)
                                return {
                                    ...user.get({ plain: true }),
                                    roles: user.roles.map(
                                        (role) => role.roleId
                                    ),
                                }
                            }
                        )
                        return [users, [a, args, context]]
                    },
                ],
            },
            Mutation: {
                userRegister: async (a, { id, email, name }) => {
                    const user = await this.userService.create({
                        id,
                        email,
                        name,
                    })
                    return {}
                },
            },
            Subscription: {},
        }

        return { typeDef, resolvers }
    }
}
