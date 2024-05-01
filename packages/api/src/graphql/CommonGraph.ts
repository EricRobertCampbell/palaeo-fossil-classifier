import { inject, injectable } from 'inversify';

import { IPubSubService } from "../service/PubSubService";
import { ILogService } from "../service/LogService";
import { IGraphBuilder } from "./IGraphBuilder";


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

  extend type Query {
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

  public constructor(
    @inject("IPubSubService") pubSubService: IPubSubService,
    @inject("ILogService") log: ILogService,
  ) {
    this.pubSubService = pubSubService;
    this.log = log;
  }

  build() {
    const resolvers = {
      Query: {

      },
      Mutation: {

      },
      Subscription: {
      },
    };

    return { typeDef, resolvers };
  }
}
