import { inject, injectable } from 'inversify';

import { IPubSubService } from "../service/PubSubService";
import { ILogService } from "../service/LogService";
import { IGraphBuilder } from "./IGraphBuilder";
import { IUserService } from '../service/UserService';


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
  }

  extend type Query {
    users: [User]
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
      email: String!,
      name: String!
    ): SimpleResult

    sampleClassify(
      userId: ID!,
      hasFossil: Boolean!,
      imageId: ID!
    ): SimpleResult
  }
`;

@injectable()
export default class CommonGraph implements IGraphBuilder {
  private pubSubService: IPubSubService;
  private log: any;
  private userService: IUserService;

  public constructor(
    @inject("IPubSubService") pubSubService: IPubSubService,
    @inject("ILogService") log: ILogService,
    @inject("IUserService") userService: IUserService,
  ) {
    this.pubSubService = pubSubService;
    this.log = log;
    this.userService = userService;
  }

  build() {
    const resolvers = {
      Query: {
        users: async (a, {  }) => {
          const users = await this.userService.getAll();
          return users;
        },
      },
      Mutation: {

      },
      Subscription: {
      },
    };

    return { typeDef, resolvers };
  }
}
