/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

//const helper = require(__dirname + '/../modules/helper');

exports.index = (request, response, next) => {
    return response.render('client/checkout/index', { layout: 'client', title: 'BTRS - Checkout', request: request });
};

exports.complete = (request, response, next) => {
    return response.render('client/checkout/complete', { layout: 'client', title: 'BTRS - Checkout Finish', request: request });
};