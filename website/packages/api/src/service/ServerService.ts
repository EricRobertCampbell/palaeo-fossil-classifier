import express from 'express'
import { ApolloServer } from '@apollo/server'
import http from 'http'
import cors from 'cors'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { inject, injectable } from 'inversify'
import { PORT } from '../settings'

import { ILogService } from './LogService'
import { IGraphBuilder } from '../graphql/IGraphBuilder'
import { ISessionService } from './SessionService'

interface MyContext {
    token?: string
}

export interface IServerService {
    start(): Promise<any>
}

@injectable()
export default class ServerService implements IServerService {
    private rootGraph: IGraphBuilder
    private log: ILogService
    private sessionService: ISessionService

    constructor(
        @inject('RootGraph') rootGraph: IGraphBuilder,
        @inject('ILogService') log: ILogService,
        @inject('ISessionService') sessionService: ISessionService
    ) {
        this.rootGraph = rootGraph
        this.log = log
        this.sessionService = sessionService
    }

    async start() {
        const httpPath = '/graphql'
        const wsPath = '/subscriptions'
        this.log.info('Starting up')

        const app = express()
        const httpServer = http.createServer(app)

        const wsServer = new WebSocketServer({
            server: httpServer,
            path: wsPath,
        })

        const schema = this.rootGraph.build()
        const serverCleanup = useServer({ schema }, wsServer)

        const server = new ApolloServer<MyContext>({
            schema,
            formatError: (err) => {
                console.log('err', err.extensions.exception, err)
                return err
            },
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose()
                            },
                        }
                    },
                },
            ],
        })
        await server.start()
        app.use(
            httpPath,
            cors<cors.CorsRequest>(),
            express.json(),
            expressMiddleware(server, {
                context: async ({ req }) => {
                    if (req.headers.authorization) {
                        return {
                            session: await this.sessionService.getByToken(
                                req.headers.authorization
                            ),
                        }
                    }
                    return {}
                },
            })
        )
        await new Promise<void>((resolve) =>
            httpServer.listen({ port: PORT }, () => {
                this.log.info(
                    `Listening on http://localhost:${PORT}${httpPath} 🚀`
                )
                this.log.info(`Listening on ws://localhost:${PORT}${wsPath} 🚀`)
                resolve()
            })
        )
    }
}
