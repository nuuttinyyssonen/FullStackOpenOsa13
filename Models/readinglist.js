const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglist',
    tableName: 'readinglist'
})

module.exports = ReadingList;