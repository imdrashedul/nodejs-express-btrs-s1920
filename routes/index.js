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


exports.route = router => {
    router.get('/', cLanding);
    router.get('/search', cSearch);
    router.get('/system', cDashboard);
    router.get('/system/login', cLogin.get);
    router.post('/system/login', cLogin.post);
    router.get('/system/register', cRegister);
    router.get('/system/buscounter', cBusCounter.index);
    router.get('/system/buscounter/add', cBusCounter.add);
    router.get('/system/buscounter/edit', cBusCounter.edit);
};