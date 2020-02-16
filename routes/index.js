/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const pathController = __dirname + '/../controllers/';
const cLanding = require( pathController + 'CLanding' );
const cLogin = require(pathController + '/CLogin');
const cDashboard = require(pathController + '/CDashboard');
const cSearch = require(pathController + '/CSearch');
const cRegister = require(pathController + '/CRegister');
const cBusCounter = require(pathController + '/CBusCounter');
const cCounterStaff = require(pathController + '/CCounterStaff');
const cManageBus = require(pathController + '/CManageBus');
const cBusSchedule = require(pathController + '/CBusSchedule');
const cTickets = require(pathController + '/CTickets');
const cTransaction = require(pathController + '/CTransaction');


exports.route = router => {
    router.get('/', cLanding);
    router.get('/search', cSearch);
    router.get('/system', cDashboard);
    router.get('/system/login', cLogin);
    router.get('/system/register', cRegister);
    router.get('/system/buscounter', cBusCounter.index);
    router.get('/system/buscounter/add', cBusCounter.add);
    router.get('/system/buscounter/edit', cBusCounter.edit);
    router.get('/system/counterstaff', cCounterStaff.index);
    router.get('/system/counterstaff/add', cCounterStaff.add);
    router.get('/system/counterstaff/edit', cCounterStaff.edit);
    router.get('/system/managebus', cManageBus.index);
    router.get('/system/managebus/add', cManageBus.add);
    router.get('/system/managebus/edit', cManageBus.edit);
    router.get('/system/busschedule', cBusSchedule.index);
    router.get('/system/busschedule/add', cBusSchedule.add);
    router.get('/system/busschedule/edit', cBusSchedule.edit);
    router.get('/system/tickets', cTickets);
    router.get('/system/transaction', cTransaction);
};