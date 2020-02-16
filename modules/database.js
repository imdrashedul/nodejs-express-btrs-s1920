const Sequelize = require('sequelize');
const sequelize = new Sequelize('atp3_btrs_express', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306, 
    hooks: {
        beforeDefine: function (columns, model) {
            model.tableName = 'btrs_' + model.name.plural;
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true
});
module.exports = sequelize;
global.database = sequelize;

