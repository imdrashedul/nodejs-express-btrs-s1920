const helper = require(__dirname + '/../modules/helper');
const MUsers = require(__dirname + '/../models/MUsers');
const MAuthSession = require(__dirname + '/../models/MAuthSession');
const MUserDetails = require(__dirname + '/../models/MUserDetails');

module.exports = async (request, response, next) => {

    let public =  [
        '/system/login',
        '/system/register'
    ];

    let invalid = [
        '/system/',
        '/system/profile' 
    ]

    let permissions = [
        // Allowed Route Set of Counter Staff [1]
        [
            '/system/logout'
        ],
        // Allowed Route Set of Bus Manager [2]
        [
            '/system/logout'
        ],
        // Allowed Route Set of Support Staff [3]
        [
            '/system/logout'
        ],
        // Allowed Route Set of Admin [4]
        [
            '/system/supportstaff',
            '/system/supportstaff/add',
            new RegExp("^\/system\/supportstaff\/edit\/[0-9]$"),
            new RegExp("^\/system\/supportstaff\/delete\/[0-9]$"),
            new RegExp("^\/system\/supportstaff\/[0-9]$"),
            '/system/busmanager',
            '/system/buscounter',
            '/system/buscounter/add',
            '/system/counterstaff',
            '/system/counterstaff/add',
            '/system/managebus',
            '/system/managebus/add',
            '/system/busschedule',
            '/system/busschedule/add',
            '/system/tickets',
            '/system/booktickets',
            '/system/discount',
            '/system/discount/add',
            '/system/transaction',
            '/system/paymethod',
            '/system/paymethod/add',
            '/system/logout'
        ]
    ]

    MAuthSession.removeExpired();

    let clientToken = helper.getLoginToken(request);
    let serverToken = await MAuthSession.getSession(clientToken);

    if(serverToken==null && helper.isEmptyString(clientToken)) {
        helper.removeLoginToken(response);
    }

    if(public.includes(request._parsedUrl.pathname)) {
        if(serverToken==null) return next();
        else return response.redirect(helper.route(request, 'system'));
    }

    if(serverToken!=null && serverToken.userid!=null) {
        let user = await MUsers.getUser(serverToken.userid);
        let userdetails = await MUserDetails.getAll(serverToken.userid);
        request.user = Object.assign({}, user, userdetails);
        if(request.user.password!=null) delete request.user.password;
        await MAuthSession.updateExpiry(serverToken);
        if((helper.isRoutePermitted(permissions[request.user.role-1], request._parsedUrl.pathname) && (request.user.valid==1 || invalid.includes(request._parsedUrl.pathname))) || request._parsedUrl.pathname == '/system/') return next();
        else return response.redirect(helper.route(request, 'system'));     
    }
        
    response.redirect(helper.route(request, 'system/login'));
}