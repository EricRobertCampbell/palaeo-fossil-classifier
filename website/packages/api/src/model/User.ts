import {
    CreationOptional,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import Classification from './Classification'
import Session from './Session'
import UserRole from './UserRole'

export default class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    public declare id: CreationOptional<string>
    public declare name: string
    public declare email: string
    public declare emailVerified: Date
    public declare image: string

    public declare getClassifications: HasManyGetAssociationsMixin<Classification>
    public declare classifications?: NonAttribute<Classification[]>

    public declare getSessions: HasManyGetAssociationsMixin<Session>
    public declare sessions?: NonAttribute<Session[]>

    public declare getRoles: HasManyGetAssociationsMixin<UserRole>
    public declare roles?: NonAttribute<UserRole[]>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        User.init(
            {
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
            },
            {
                sequelize,
                defaultScope: {
                    attributes: [
                        'id',
                        'name',
                        'email',
                        'emailVerified',
                        'image',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        )
    }
}
