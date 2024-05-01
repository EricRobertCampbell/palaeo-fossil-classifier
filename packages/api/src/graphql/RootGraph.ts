
import { makeExecutableSchema } from '@graphql-tools/schema';

import { inject, injectable } from 'inversify';
import { merge } from 'lodash';
import { IGraphBuilder } from './IGraphBuilder';

@injectable()
export default class Root implements IGraphBuilder {
  private commonGraph: IGraphBuilder;
  private strategyGraph: IGraphBuilder;

  public constructor(
    @inject("CommonGraph") commonGraph: IGraphBuilder,
  ) {
    this.commonGraph = commonGraph;
  }

  build() {
    const { typeDef: Common, resolvers: commonResolvers } = this.commonGraph.build();

    const Query = `
      type Mutation {
        _empty: String
      }
      
      type Query {
        _empty: String
      }

      type Subscription {
        _empty: String
      }
    `;

    const resolvers = {};

    return makeExecutableSchema({
      typeDefs: [Query, Common],
      resolvers: merge(resolvers, commonResolvers),
    });
  }
}