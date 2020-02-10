/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');

exports.index = (request, response, next) => {
    return response.render('system/buscounter/index', { layout: 'system', title: 'Bus Counters', active:'buscounter', navigations: [], request: request });
};

exports.add = (request, response, next) => {
    return response.render('system/buscounter/add', { layout: 'system', title: 'Add Bus Counter', active:'buscounter', navigations: [
        [ "system/buscounter", "Bus Counters" ]
    ], request: request });
};

exports.edit = (request, response, next) => {
    return response.render('system/buscounter/edit', { layout: 'system', title: 'Update Bus Counter', active:'buscounter', navigations: [
        [ "system/buscounter", "Bus Counters" ]
    ], request: request });
};