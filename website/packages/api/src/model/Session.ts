import {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import User from './User'

export default class Session extends Model<
    InferAttributes<Session>,
    InferCreationAttributes<Session>
> {
    public declare id: CreationOptional<string>
    public declare expires: Date
    public declare sessionToken: string

    public declare userId: ForeignKey<User['id']>
    public declare user?: NonAttribute<User>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        Session.init(
            {
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
            },
            {
                sequelize,
                defaultScope: {
                    attributes: [
                        'id',
                        'expires',
                        'sessionToken',
                        'userId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        )
    }
}
