/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */
'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable("btrs_userdetails", {
            id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
            userid: { 
                type: DataTypes.BIGINT(20).UNSIGNED, 
                allowNull: false,
                references: { model: 'btrs_users', key: 'id' }
            },
            type: { type: DataTypes.STRING(100), allowNull: false },
            data: { type: DataTypes.TEXT('long'), allowNull: false }
        }, {timestamps: false});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("btrs_userdetails");
    }
};
