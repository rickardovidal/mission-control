import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class Operator extends Model {}

Operator.init(
  {
    operatorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "operator_id",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    specialty: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: [["available", "assigned", "unavailable"]],
      },
    },
  },
  {
    sequelize,
    modelName: "Operator",
    tableName: "operators",
    timestamps: true,
    underscored: true,
  },
);

export default Operator;
