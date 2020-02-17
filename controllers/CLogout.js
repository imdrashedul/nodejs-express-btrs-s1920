/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');
const MAuthSession = require(__dirname + '/../models/MAuthSession');

exports.get = (request, response, next) => {
    let token = helper.getLoginToken(request);
    helper.removeLoginToken(response);
    MAuthSession.removeSession(token);
    return response.redirect(helper.route(request, 'system/login'));
};