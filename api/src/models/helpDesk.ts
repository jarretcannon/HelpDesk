import { DataTypes, Model, Sequelize } from "sequelize";

export class Request extends Model {
  public helpId!: number;
  public name!: string;
  public email!: string;
  public description!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RequestFactory(sequelize: Sequelize) {
  Request.init(
    {
      helpId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "New",
        unique: false, //
      },
    },
    {
      sequelize,
      tableName: "requests",
    }
  );
}
