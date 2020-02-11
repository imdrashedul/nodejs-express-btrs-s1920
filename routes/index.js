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
const cPrintVerify = require(pathController + '/CPrintVerify');
const cCancel = require(pathController + '/CCancel');
const cHelp = require(pathController + '/CHelp');
const cCheckOut = require(pathController + '/CCheckOut');
const cRegister = require(pathController + '/CRegister');
const cBusCounter = require(pathController + '/CBusCounter');


exports.route = router => {
    router.get('/', cLanding);
    router.get('/search', cSearch);
    router.get('/cancel', cCancel);
    router.get('/printverify', cPrintVerify);
    router.get('/help', cHelp);
    router.get('/checkout', cCheckOut.index);
    router.get('/checkout/complete', cCheckOut.complete);
    router.get('/system', cDashboard);
    router.get('/system/login', cLogin);
    router.get('/system/register', cRegister);
    router.get('/system/buscounter', cBusCounter.index);
    router.get('/system/buscounter/add', cBusCounter.add);
    router.get('/system/buscounter/edit', cBusCounter.edit);
};