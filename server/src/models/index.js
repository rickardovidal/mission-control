
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

/*

Robot.hasMany(Mission) — um robot pode ter várias missões;
Mission.belongsTo(Robot) — cada missão pertence a um robot;
foreignKey: 'robotId' usa o atributo JavaScript que mapeia robot_id;
as: 'missions' e as: 'robot' serão usados mais tarde nos include;
RESTRICT corresponde à regra que definimos no PostgreSQL.

--------------------------------------------------------------------

Robot.hasMany(Mission) — um robot pode ter várias missões;
Mission.belongsTo(Robot) — cada missão pertence a um robot;
foreignKey: 'robotId' usa o atributo JavaScript que mapeia robot_id;
as: 'missions' e as: 'robot' serão usados mais tarde nos include;
RESTRICT corresponde à regra que definimos no PostgreSQL.

----------------------------------------------------------------------

- uma missão pode ter vários operadores;
- a ligação passa pelo modelo MissionOperator;
- missionId identifica a missão na tabela intermédia;
- operatorId identifica o outro lado da relação.
No segundo bloco, a perspetiva é invertida:
- um operador pode participar em várias missões;
- por isso operatorId passa a ser a chave principal da associação e missionId

*/