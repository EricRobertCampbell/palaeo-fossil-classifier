import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import User from './User';

export default class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
  declare public id: CreationOptional<string>;
  declare public expires: Date;
  declare public sessionToken: string;

  declare public userId: ForeignKey<User['id']>;
  declare public user?: NonAttribute<User>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    Session.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
      },
      sessionToken: {
        type: DataTypes.STRING,
        unique: 'sessionToken',
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'expires',
          'sessionToken',
          'userId',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

