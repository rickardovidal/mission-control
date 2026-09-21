import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class MissionLog extends Model {}

MissionLog.init(
  {
    missionLogId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "mission_log_id",
    },
    missionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "mission_id",
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "info",
      validate: {
        isIn: [["info", "warning", "error"]],
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    modelName: "MissionLog",
    tableName: "mission_logs",
    timestamps: false,
    underscored: true,
  },
);

export default MissionLog;