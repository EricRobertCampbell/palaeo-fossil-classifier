import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    DataTypes as _DataTypes,
} from 'sequelize'

export default class VerificationToken extends Model<
    InferAttributes<VerificationToken>,
    InferCreationAttributes<VerificationToken>
> {
    public declare identifier: string
    public declare expires: Date
    public declare token: string

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        VerificationToken.init(
            {
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
            },
            {
                sequelize,
                defaultScope: {
                    attributes: [
                        'identifier',
                        'expires',
                        'token',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                indexes: [{ fields: ['identifier', 'token', 'expires'] }],
            }
        )
    }
}
