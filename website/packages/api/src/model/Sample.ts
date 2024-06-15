import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    DataTypes as _DataTypes,
} from 'sequelize'

export default class Sample extends Model<
    InferAttributes<Sample>,
    InferCreationAttributes<Sample>
> {
    public declare id: CreationOptional<string>
    public declare imageUrl: string

    public declare createdAt: CreationOptional<Date>
    public declare updatedAt: CreationOptional<Date>

    static initialize(sequelize, DataTypes = _DataTypes) {
        Sample.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                imageUrl: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                sequelize,
                defaultScope: {
                    attributes: ['id', 'imageUrl', 'createdAt', 'updatedAt'],
                },
            }
        )
    }
}
