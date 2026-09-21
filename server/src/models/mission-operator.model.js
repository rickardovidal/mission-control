import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class MissionOperator extends Model {}

MissionOperator.init(
  {
    missionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: "mission_id",
    },
    operatorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: "operator_id",
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "assigned_at",
    },
  },

  {
    sequelize,
    modelName: "MissionOperator",
    tableName: "mission_operators",
    timestamps: false,
    underscored: true,
  },
);

export default MissionOperator;
