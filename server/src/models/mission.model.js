import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class Mission extends Model {}

Mission.init(
  {
    missionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "mission_id",
    },
    robotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "robot_id",
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "planned",
      allowNull: false,
      validate: {
        isIn: [["planned", "in_progress", "completed", "cancelled"]],
      },
    },
    priority: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "medium",
      validate: {
        isIn: [["low", "medium", "high", "critical"]],
      },
    },
    scheduledStart: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "scheduled_start",
    },
    scheduledEnd: {
      type: DataTypes.DATE,
      field: "scheduled_end",
    },
  },
  {
    sequelize,
    modelName: "Mission",
    tableName: "missions",
    timestamps: true,
    underscored: true,
  },
);

export default Mission;
