import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class Robot extends Model {}

/*

DataTypes permite definir tipos como INTEGER e STRING;
Model é a classe-base fornecida pelo Sequelize;
sequelize é a ligação à base de dados que configurámos;
Robot extends Model cria o nosso modelo, ainda sem atributos.

*/

Robot.init(
    {
        robotId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'robot_id',
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        serialNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'serial_number',
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'available',
            validate: {
                isIn: ['available', 'assigned', 'maintenance', 'offline'],
            },
        },
        batteryLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
            field: 'battery_level',
            validate: {
                min: 0, 
                max: 100,
            },
        },
       
    },
    {
        sequelize,
        modelName: 'Robot',
        tableName: 'robots',
        timestamps: true,
        underscored: true,
    },
);

export default Robot;
