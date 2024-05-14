import { CreationOptional, ForeignKey, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import Classification from './Classification';
import User from './User';

export default class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
  declare public id: CreationOptional<string>;
  
  declare public type: string;
  declare public provider: string;
  declare public providerAccountId: string;
  declare public refreshToken: string;
  declare public accessToken: string;
  declare public expiresAt: number;
  declare public idToken: string;
  declare public scope: string;
  declare public sessionState: string;
  declare public tokenType: string;

  declare public userId: ForeignKey<User['id']>;
  declare public user?: NonAttribute<User>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    Account.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerAccountId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      expiresAt: DataTypes.INTEGER,
      tokenType: DataTypes.STRING,
      scope: DataTypes.STRING,
      idToken: DataTypes.TEXT,
      sessionState: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
      },
      
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'userId',
          'type',
          'provider',
          'providerAccountId',
          'refreshToken',
          'accessToken',
          'expiresAt',
          'idToken',
          'scope',
          'sessionState',
          'tokenType',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

