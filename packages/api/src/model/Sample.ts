import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes as _DataTypes } from 'sequelize';

export default class Sample extends Model<InferAttributes<Sample>, InferCreationAttributes<Sample>> {
  declare public id: CreationOptional<string>;
  declare public imageUrl: string;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    Sample.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      imageUrl: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'id',
          'imageUrl',
          'createdAt',
          'updatedAt'
        ],
      },
    });    
  }
}

