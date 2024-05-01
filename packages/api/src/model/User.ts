import { CreationOptional, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import Classification from './Classification';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare public id: CreationOptional<string>;
  declare public name: string;

  declare public getClassifications: HasManyGetAssociationsMixin<Classification>;
  declare public classifications?: NonAttribute<Classification[]>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    User.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'name',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

