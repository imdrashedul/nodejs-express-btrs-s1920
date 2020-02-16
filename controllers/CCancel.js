/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

//const helper = require(__dirname + '/../modules/helper');

module.exports = (request, response, next) => {
    return response.render('client/cancel', { layout: 'client', title: 'Cancel Ticket', request: request });
};