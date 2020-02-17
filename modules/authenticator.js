const helper = require(__dirname + '/../modules/helper');
const MAuthSession = require(__dirname + '/../models/MAuthSession');

module.exports = async (request, response, next) => {

    let public =  [
        '/system/login',
        '/system/register'
    ];

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
        request.userid = serverToken.userid;
        MAuthSession.updateExpiry(serverToken);
        return next(); 
    }
        
    response.redirect(helper.route(request, 'system/login'));
}