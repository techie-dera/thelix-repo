import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;