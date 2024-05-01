import express from 'express';
import { ApolloServer } from '@apollo/server';
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { inject, injectable } from 'inversify';
import { PORT } from '../settings';

import { ILogService } from './LogService';
import { IGraphBuilder } from '../graphql/IGraphBuilder';

interface MyContext {
  token?: String;
}

export interface IServerService {
  start(): Promise<any>;
}

interface ConnectionParmas {
  id: string;
  name: string;
}

@injectable()
export default class ServerService implements IServerService {
  private rootGraph: IGraphBuilder;
  private log: ILogService;

  constructor(
    @inject("RootGraph") rootGraph: IGraphBuilder,
    @inject("ILogService") log: ILogService,
  ) {
    this.rootGraph = rootGraph;
    this.log = log;
  }

  async start() {
    const httpPath = '/graphql';
    const wsPath = '/subscriptions';
    this.log.info('Starting up');

    const app = express();
    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: wsPath,
    });

    const schema = this.rootGraph.build();
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer<MyContext>({
      schema,
      formatError: (err) => {
        console.log('err', err.extensions.exception, err);
        return err;
      },
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });
    await server.start();
    app.use(
      httpPath,
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        // context: async ({ req }) => { 
        //   return { token: req.headers.token };
        // },
      }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, () => {
      this.log.info(`Listening on http://localhost:${ PORT }${ httpPath } 🚀`);
      this.log.info(`Listening on ws://localhost:${ PORT }${ wsPath } 🚀`);
      resolve();
    }));
  }

}
