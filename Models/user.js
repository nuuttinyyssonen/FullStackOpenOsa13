const { Model, DataTypes } = require('sequelize');
const { db } = require('../util/db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    }, {
    sequelize: db,
    underscored: true,
    timestamps: true,
    modelName: 'User'
})

module.exports = User