import { CreationOptional, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import User from './User';
import UserRole from './UserRole';

export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare public id: CreationOptional<string>;

  declare public description: string;

  declare public getUsers: HasManyGetAssociationsMixin<User>;
  declare public users?: NonAttribute<User[]>;

  declare public getUserRoles: HasManyGetAssociationsMixin<UserRole>;
  declare public userRoles?: NonAttribute<UserRole[]>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    Role.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'description',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

