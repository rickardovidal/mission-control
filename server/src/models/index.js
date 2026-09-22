
import MissionLog from "./mission-log.model.js";
import MissionOperator from "./mission-operator.model.js";
import Mission from "./mission.model.js";
import Operator from './operator.model.js'
import Robot from "./robot.model.js";

Robot.hasMany(Mission, {
    foreignKey: 'robotId',
    as: 'missions',
    onDelete: 'RESTRICT',
});

Mission.belongsTo(Robot, {
    foreignKey: 'robotId',
    as: 'robot',
    onDelete: 'RESTRICT'
});

Mission.hasMany(MissionLog, {
    foreignKey: 'missionId',
    as: 'logs',
    onDelete: 'CASCADE',
});

MissionLog.belongsTo(Mission, {
    foreignKey: 'missionId',
    as: 'mission',
    onDelete: 'CASCADE',
});


Mission.belongsToMany(Operator, {
    through: MissionOperator,
    foreignKey: 'missionId',
    otherKey: 'operatorId',
    as: 'operators',
    onDelete: 'CASCADE',
});

Operator.belongsToMany(Mission, {
    through: MissionOperator,
    foreignKey: 'operatorId',
    otherKey: 'missionId',
    as: 'missions',
    onDelete: 'CASCADE',
});

export { Mission, MissionLog, MissionOperator, Operator, Robot };
