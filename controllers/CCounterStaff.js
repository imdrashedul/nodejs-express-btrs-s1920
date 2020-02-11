/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');

exports.index = (request, response, next) => {
    return response.render('system/counterstaff/index', { layout: 'system', title: 'Counter Staff', active:'counterstaff', navigations: [], request: request });
};

exports.add = (request, response, next) => {
    return response.render('system/counterstaff/add', { layout: 'system', title: 'Add Counter Staff', active:'counterstaff', navigations: [
        [ "system/counterstaff", "Counter Staff" ]
    ], request: request });
};

exports.edit = (request, response, next) => {
    return response.render('system/counterstaff/edit', { layout: 'system', title: 'Update Counter Staff', active:'counterstaff', navigations: [
        [ "system/counterstaff", "Counter Staff" ]
    ], request: request });
};