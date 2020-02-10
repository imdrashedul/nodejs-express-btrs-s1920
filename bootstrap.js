/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const routes = require('./routes/index');

module.exports = (app, router) => {
    return routes.route(router);    
};