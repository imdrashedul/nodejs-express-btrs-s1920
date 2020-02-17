/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("btrs_authsession", {
      id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
      userid: { 
        type: DataTypes.BIGINT(20).UNSIGNED, 
        allowNull: false,
        references: { model: 'btrs_users', key: 'id' }
      },
      token: { type: DataTypes.STRING(155), unique: true, allowNull: false },
      expire: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.literal('CURRENT_TIMESTAMP') }, 
    }, {timestamps: false});
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("btrs_authsession");
  }
};
