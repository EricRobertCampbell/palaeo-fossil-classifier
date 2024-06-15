import {
    CreationOptional,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import User from './User'
import UserRole from './UserRole'

export default class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> {
    public declare id: CreationOptional<string>

    public declare description: string

    public declare getUsers: HasManyGetAssociationsMixin<User>
    public declare users?: NonAttribute<User[]>

    public declare getUserRoles: HasManyGetAssociationsMixin<UserRole>
    public declare userRoles?: NonAttribute<UserRole[]>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        Role.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                description: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize,
                defaultScope: {
                    attributes: ['id', 'description', 'createdAt', 'updatedAt'],
                },
            }
        )
    }
}
