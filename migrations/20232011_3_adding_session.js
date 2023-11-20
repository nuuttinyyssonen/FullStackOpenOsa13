const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('sessions', {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            }
        })
        await queryInterface.addColumn('users', 'enabled', {
            type: DataTypes.BOOLEAN,
            default: true
        })
        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            default: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('sessions');
        await queryInterface.removeColumn('users', 'enabled');
        await queryInterface.removeColumn('users', 'disbaled');
    }
}