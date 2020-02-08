const routes = require('./routes/index');

module.exports = (app, router) => {
    return routes.route(router);    
};