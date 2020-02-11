/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');

exports.index = (request, response, next) => {
    return response.render('system/busschedule/index', { layout: 'system', title: 'Bus Schedule', active:'busschedule', navigations: [], request: request });
};

exports.add = (request, response, next) => {
    return response.render('system/busschedule/add', { layout: 'system', title: 'Add Bus Schedule', active:'busschedule', navigations: [
        [ "system/busschedule", "Bus Schedule" ]
    ], request: request });
};

exports.edit = (request, response, next) => {
    return response.render('system/busschedule/edit', { layout: 'system', title: 'Update Bus Schedule', active:'busschedule', navigations: [
        [ "system/busschedule", "Bus Schedule" ]
    ], request: request });
};