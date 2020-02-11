/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

module.exports = (request, response, next) => {
    return response.render('client/printverify', { layout: 'client', title: 'Print/Verify', request: request });
};