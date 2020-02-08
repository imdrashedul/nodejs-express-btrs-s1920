const pathController = __dirname + '/../controllers/';
const cLanding = require( pathController + 'CLanding' );
const cLogin = require(pathController + '/CLogin');

exports.route = router => {
    router.get('/', cLanding);
    router.get('/login', cLogin);
};