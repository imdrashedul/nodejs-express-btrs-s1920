const DataTypes = require('sequelize');

const UsersTable = database.define('users', {
    id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(155), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(155), allowNull: false },
    gender: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'm'}, 
    role: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 0 }, 
    validate: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 0 }, 
    registered: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.literal('CURRENT_TIMESTAMP') },
}, {timestamps: false});

module.exports = {
    instance : UsersTable,
    getUsers : () => {
        return UsersTable.findAll({raw: true});
    },
    getUserByEmail : email => {
        return UsersTable.findOne({ where: {
            email : email
        }, raw: true});
    }
}
