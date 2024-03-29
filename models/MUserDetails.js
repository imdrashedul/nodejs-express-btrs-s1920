/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const DataTypes = require('sequelize');

const UserDetailsTable = database.define('userdetails', {
    id: { type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true },
    userid: { 
        type: DataTypes.BIGINT(20).UNSIGNED, 
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    type: { type: DataTypes.STRING(100), allowNull: false },
    data: { type: DataTypes.TEXT('long'), allowNull: false }
}, {timestamps: false});

exports.instance = UserDetailsTable;

exports.getAll = async userid => {
    let details = await UserDetailsTable.findAll({where : { userid : userid }, raw: true});
    let data = {};
    if(details.length>0) {
        details.forEach(detail => {
            data[detail.type] = detail.data;
        });
    }
    return data;
}

exports.addOne = async details => {
    const userdetails = await UserDetailsTable.create(details);
    return userdetails.save();
}

exports.addBulk = async rows => {
    for(let i = 0; i<rows.length; i++) {
        await this.addOne(rows[i]);
    }
}

exports.map = data => {
    return {
        userid : data[0],
        type : data[1],
        data : data[2]
    }
}
    
exports.getOne = async (userid, type) => {
    return UserDetailsTable.findAll({where : { userid : userid }, raw: true});
}