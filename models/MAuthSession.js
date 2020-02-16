const DataTypes = require('sequelize');

const AuthSessionTable = database.define('authsession', {
    id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
    userid: { 
        type: DataTypes.BIGINT(20).UNSIGNED, 
        unique: true, 
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    token: { type: DataTypes.STRING(155), unique: true, allowNull: false },
    expire: { type: DataTypes.DATE, defaultValue: DataTypes.literal('CURRENT_TIMESTAMP') }, 
}, {timestamps: false});

module.exports = {
    instance : AuthSessionTable,
    getSession : (options) => {
        return AuthSessionTable.findAll({raw: true});
    }
};
