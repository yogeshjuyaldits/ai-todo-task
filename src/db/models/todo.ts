import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Todo extends Model {
  public id!: number;
  public task!: string;
  public completed!: boolean;
}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    task: { type: DataTypes.STRING, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "todos",
    timestamps: true,
  }
);

export default Todo;
