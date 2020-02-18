/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const DataTypes = require('sequelize');
const datetime = require('node-datetime');

const AuthSessionTable = database.define('authsession', {
    id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
    userid: { 
        type: DataTypes.BIGINT(20).UNSIGNED, 
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    token: { type: DataTypes.STRING(155), unique: true, allowNull: false },
    expire: { type: DataTypes.DATE, defaultValue: DataTypes.literal('CURRENT_TIMESTAMP') }, 
}, {timestamps: false, freezeTableName: true});

module.exports = {
    instance : AuthSessionTable,
    //Get Authentication Session
    getSession : token => {
        return AuthSessionTable.findOne({where: {
            token: token
        }, raw: true});
    },
    //Store Authentication Session
    storeSession : async (userid, token) => {
        let expire = datetime.create();
        expire.offsetInHours(1);
        const session = await AuthSessionTable.create({
            userid: userid,
            token: token,
            expire: expire.format("Y-m-d H:M:S")
        });
        return session.save();
    },
    //Modify Authentication Session 
    updateExpiry : async session => {
        let expire = datetime.create();
        expire.offsetInHours(1);
        return await AuthSessionTable.update({ expire: expire.format("Y-m-d H:M:S") }, { where: {id: session.id} });
    },
    //Remove Authentication Session 
    removeSession : async token => {
        return await AuthSessionTable.destroy({
            where: { token: token }
        });
    },
    //Remove Expired Session 
    removeExpired : async () => {
        return await AuthSessionTable.destroy({
            where: { expire: {[DataTypes.Op.lt]: new Date()} }
        });
    }
};
