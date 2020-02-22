/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const DataTypes = require('sequelize');

const UsersTable = database.define('users', {
    id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(155), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(155), allowNull: false },
    gender: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 'm'}, 
    role: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 0 }, 
    valid: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: 0 }, 
    registered: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.literal('CURRENT_TIMESTAMP') },
}, {timestamps: false});

exports.instance = UsersTable;
// Create USer
exports.addUser = async details => {
    const user = await UsersTable.create(details);
    return user.save();
}
// Get All Users
exports.getUsers = () => {
    return UsersTable.findAll({raw: true});
}
// Get User By Id 
exports.getUser = id => {
    return UsersTable.findOne({ where: {
        id : id
    }, raw: true});
}
//Get User By Email 
exports.getUserByEmail = email => {
    return UsersTable.findOne({ where: {
        email : email
    }, raw: true});
}

