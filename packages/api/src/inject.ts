import {
  DataTypes, Sequelize,
} from 'sequelize';
import { Container } from 'inversify';

import sequelize from './database';

import { IGraphBuilder } from './graphql/IGraphBuilder';
import CommonGraph from './graphql/CommonGraph';
import RootGraph from './graphql/RootGraph';

import LogService, { ILogService } from './service/LogService';
import PubSubService, { IPubSubService } from './service/PubSubService';
import ServerService, { IServerService } from './service/ServerService';

import { Logger } from './log/Logger';
import { LoggerConsole } from './log/LoggerConsole';

import Seed, { ISeed } from './fixtures/Seed';
import User from './model/User';
import Sample from './model/Sample';
import Classification from './model/Classification';

export default function setup(app: Container) {

  User.initialize(sequelize, DataTypes);
  Sample.initialize(sequelize, DataTypes);
  Classification.initialize(sequelize, DataTypes);

  Classification.belongsTo(User, {
    as: 'user',
  });
  User.hasMany(Classification, {
    foreignKey: 'userId',
    as: 'classifications',
  });
  
  Classification.belongsTo(Sample, {
    as: 'sample',
  });
  Sample.hasMany(Classification, {
    foreignKey: 'sampleId',
    as: 'classifications',
  });
  
  app.bind<IServerService>('IServerService').to(ServerService);
  app.bind<IGraphBuilder>('RootGraph').to(RootGraph);
  app.bind<IGraphBuilder>('CommonGraph').to(CommonGraph);
  app.bind<ILogService>('ILogService').to(LogService);
  app.bind<IPubSubService>('IPubSubService').to(PubSubService);
  app.bind<ISeed>('ISeed').to(Seed);
  
  app.bind<Logger>('LoggerConsole').to(LoggerConsole);
  app.bind<Sequelize>('Sequelize').toConstantValue(sequelize);

  app.bind<typeof Request>('Request').toConstantValue(Request);
  app.bind<typeof User>('User').toConstantValue(User);
  app.bind<typeof Sample>('Sample').toConstantValue(Sample);
  app.bind<typeof Classification>('Classification').toConstantValue(Classification);
  app.bind<Container>('Container').toDynamicValue(ctx => ctx.container as Container);
}

