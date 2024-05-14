import { CreationOptional, InferAttributes, InferCreationAttributes, Model, DataTypes as _DataTypes } from 'sequelize';

export default class VerificationToken extends Model<InferAttributes<VerificationToken>, InferCreationAttributes<VerificationToken>> {
  declare public identifier: string;
  declare public expires: Date;
  declare public token: string;

  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  
  static initialize(sequelize, DataTypes = _DataTypes) {
    VerificationToken.init({
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      defaultScope: {
        attributes: [
          'identifier',
          'expires',
          'token',
          'createdAt',
          'updatedAt'
        ],
      },
      indexes: [
        { fields: ['identifier', 'token', 'expires'] },
      ],
    });    
  }
}

