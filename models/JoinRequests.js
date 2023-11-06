const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class JoinRequests extends Model {}

JoinRequests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clubs',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'joinrequests',
    }
);

module.exports = JoinRequests;