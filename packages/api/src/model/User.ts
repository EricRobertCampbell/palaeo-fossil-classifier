import { CreationOptional, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import Classification from './Classification';
import Session from './Session';
import UserRole from './UserRole';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare public id: CreationOptional<string>;
  declare public name: string;
  declare public email: string;
  declare public emailVerified: Date;
  declare public image: string;

  declare public getClassifications: HasManyGetAssociationsMixin<Classification>;
  declare public classifications?: NonAttribute<Classification[]>;

  declare public getSessions: HasManyGetAssociationsMixin<Session>;
  declare public sessions?: NonAttribute<Session[]>;

  declare public getRoles: HasManyGetAssociationsMixin<UserRole>;
  declare public roles?: NonAttribute<UserRole[]>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    User.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: 'email',
      },
      emailVerified: {
        type: DataTypes.DATE,
      },
      image: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'name',
          'email',
          'emailVerified',
          'image',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

