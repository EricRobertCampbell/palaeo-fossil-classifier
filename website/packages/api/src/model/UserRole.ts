import {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import Role from './Role'
import User from './User'

export default class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
> {
    public declare id: CreationOptional<string>

    public declare userId: ForeignKey<User['id']>
    public declare user?: NonAttribute<User>

    public declare roleId: ForeignKey<Role['id']>
    public declare role?: NonAttribute<Role>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        UserRole.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
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
                        'roleId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        )
    }
}
