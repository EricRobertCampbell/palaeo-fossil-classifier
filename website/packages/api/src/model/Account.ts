import {
    CreationOptional,
    ForeignKey,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import Classification from './Classification'
import User from './User'

export default class Account extends Model<
    InferAttributes<Account>,
    InferCreationAttributes<Account>
> {
    public declare id: CreationOptional<string>

    public declare type: string
    public declare provider: string
    public declare providerAccountId: string
    public declare refreshToken: string
    public declare accessToken: string
    public declare expiresAt: number
    public declare idToken: string
    public declare scope: string
    public declare sessionState: string
    public declare tokenType: string

    public declare userId: ForeignKey<User['id']>
    public declare user?: NonAttribute<User>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        Account.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                provider: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                providerAccountId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                refreshToken: DataTypes.STRING,
                accessToken: DataTypes.STRING,
                expiresAt: DataTypes.INTEGER,
                tokenType: DataTypes.STRING,
                scope: DataTypes.STRING,
                idToken: DataTypes.TEXT,
                sessionState: DataTypes.STRING,
                userId: {
                    type: DataTypes.UUID,
                },

                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize,
                defaultScope: {
                    attributes: [
                        'id',
                        'userId',
                        'type',
                        'provider',
                        'providerAccountId',
                        'refreshToken',
                        'accessToken',
                        'expiresAt',
                        'idToken',
                        'scope',
                        'sessionState',
                        'tokenType',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        )
    }
}
