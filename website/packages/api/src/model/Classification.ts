import {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
    DataTypes as _DataTypes,
} from 'sequelize'
import Sample from './Sample'
import User from './User'

export default class Classification extends Model<
    InferAttributes<Classification>,
    InferCreationAttributes<Classification>
> {
    public declare id: CreationOptional<string>

    public declare userId: ForeignKey<User['id']>
    public declare user?: NonAttribute<User>

    public declare sampleId: ForeignKey<Sample['id']>
    public declare sample?: NonAttribute<Sample>

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        Classification.init(
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
                        'sampleId',
                        'createdAt',
                        'updatedAt',
                    ],
                },
            }
        )
    }
}
