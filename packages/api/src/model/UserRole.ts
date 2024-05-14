import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import Role from './Role';
import User from './User';

export default class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
  declare public id: CreationOptional<string>;

  declare public userId: ForeignKey<User['id']>;
  declare public user?: NonAttribute<User>;

  declare public roleId: ForeignKey<Role['id']>;
  declare public role?: NonAttribute<Role>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    UserRole.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'userId',
          'roleId',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

