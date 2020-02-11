/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');

exports.index = (request, response, next) => {
    return response.render('system/managebus/index', { layout: 'system', title: 'Manage Bus', active:'managebus', navigations: [], request: request });
};

exports.add = (request, response, next) => {
    return response.render('system/managebus/add', { layout: 'system', title: 'Manage Bus', active:'managebus', navigations: [
        [ "system/managebus", "Buses" ]
    ], request: request });
};

exports.edit = (request, response, next) => {
    return response.render('system/managebus/edit', { layout: 'system', title: 'Manage Bus', active:'managebus', navigations: [
        [ "system/managebus", "Buses" ]
    ], request: request });
};