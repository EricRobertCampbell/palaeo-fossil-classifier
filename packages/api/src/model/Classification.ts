import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes as _DataTypes } from 'sequelize';
import Sample from './Sample';
import User from './User';

export default class Classification extends Model<InferAttributes<Classification>, InferCreationAttributes<Classification>> {
  declare public id: CreationOptional<string>;

  declare public userId: ForeignKey<User['id']>;
  declare public user?: NonAttribute<User>;

  declare public sampleId: ForeignKey<Sample['id']>;
  declare public sample?: NonAttribute<Sample>;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    Classification.init({
      id: {
        type: DataTypes.STRING,
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
          'sampleId',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

