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
import Role from './model/Role';
import UserRole from './model/UserRole';
import Sample from './model/Sample';
import Classification from './model/Classification';
import VerificationToken from './model/VerificationToken';
import Session from './model/Session';
import Account from './model/Account';
import UserService, { IUserService } from './service/UserService';
import VerificationTokenService, { IVerificationTokenService } from './service/VerificationTokenService';
import SessionService, { ISessionService } from './service/SessionService';

export default function setup(app: Container) {

  User.initialize(sequelize, DataTypes);
  Role.initialize(sequelize, DataTypes);
  UserRole.initialize(sequelize, DataTypes);
  Sample.initialize(sequelize, DataTypes);
  Classification.initialize(sequelize, DataTypes);
  VerificationToken.initialize(sequelize, DataTypes);
  Session.initialize(sequelize, DataTypes);
  Account.initialize(sequelize, DataTypes);

  // User
  Session.belongsTo(User, {
    as: 'user',
  });
  User.hasMany(Session, {
    foreignKey: 'userId',
    as: 'sessions',
  });

  Classification.belongsTo(User, {
    as: 'user',
  });
  User.hasMany(Classification, {
    foreignKey: 'userId',
    as: 'classifications',
  });

  Account.belongsTo(User, {
    as: 'user',
  });
  User.hasMany(Account, {
    foreignKey: 'userId',
    as: 'accounts',
  });

  UserRole.belongsTo(User, {
    as: 'user',
  });
  User.hasMany(UserRole, {
    foreignKey: 'userId',
    as: 'roles',
  });

  UserRole.belongsTo(Role, {
    as: 'role',
  });
  Role.hasMany(UserRole, {
    foreignKey: 'roleId',
    as: 'userRoles',
  });

  // Sample
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
  app.bind<IUserService>('IUserService').to(UserService);
  app.bind<ISessionService>('ISessionService').to(SessionService);
  app.bind<IVerificationTokenService>('IVerificationTokenService').to(VerificationTokenService);
  app.bind<ISeed>('ISeed').to(Seed);
  
  app.bind<Logger>('LoggerConsole').to(LoggerConsole);
  app.bind<Sequelize>('Sequelize').toConstantValue(sequelize);

  app.bind<typeof Request>('Request').toConstantValue(Request);
  app.bind<typeof User>('User').toConstantValue(User);
  app.bind<typeof Role>('Role').toConstantValue(Role);
  app.bind<typeof UserRole>('UserRole').toConstantValue(UserRole);
  app.bind<typeof Sample>('Sample').toConstantValue(Sample);
  app.bind<typeof VerificationToken>('VerificationToken').toConstantValue(VerificationToken);
  app.bind<typeof Classification>('Classification').toConstantValue(Classification);
  app.bind<typeof Session>('Session').toConstantValue(Session);
  app.bind<typeof Account>('Account').toConstantValue(Account);
  app.bind<Container>('Container').toDynamicValue(ctx => ctx.container as Container);
}

