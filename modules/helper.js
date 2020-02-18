/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const dateFormat = require('dateformat');
const bcrypt = require('bcrypt');

exports.base_url = (request) => {
    return request.protocol + '://' + request.get('host') + '/';
}

exports.route = (request, value) => {
    return this.base_url(request) + value;
}

exports.asset = (request, value) => {
    return this.route(request, value);
}

exports.now = (expression) => {
    return dateFormat(new Date(), expression);
}

exports.copyright = () => {
    let year = this.now('yyyy');
    return year=='2020'?year:'2020-'+year;
}

exports.renderMenu = (request, slug, active, href, title, icon, asset ) => {
    let context = '<li>';
    icon = !icon || typeof icon != 'string' ? 'assets/img/it.png' : icon
    asset = !asset || typeof asset != 'string' ? 'system/' : asset
	context += '<a href="'+this.route(request, href)+'"'+(slug==active?' class="active"':'')+'>';
    context += '<img src="'+this.asset(request, asset+icon)+'"> ';
	context += title;
	context += '</a>';
    context += '</li>';
    return context;
} 

exports.addSession = (request, key, value) => {
    return request.session[key] = value;
}

exports.getSession = (request, key) => {
    return request.session[key];
}

exports.removeSession = (request, key) => {
    if(request.session[key] != null) delete request.session[key];
}

exports.addError = (request, key, value) => {
    if(!(request.session.errors != null))  request.session.errors = {};
    return request.session.errors[key] = value; 
}

exports.getError = (request, key) => {
    let error = {};
    if(!(request.session.errors != null))  request.session.errors = {};
    if(request.session.errors[key]!= null){
        error = request.session.errors[key];
        delete request.session.errors[key];
    }
    return error;
}

exports.renderError = (request, set, hook, label, addon) => {
    let context = null;
    label = !label || typeof label != 'boolean' ? false : label;
    addon = !addon || typeof addon != 'string' ? ' field-error' : addon;
    if(set[hook]!=null) {
        context = label ? ' error' : '<img src="'+this.asset(request, 'system/assets/img/danger.png')+'" width="12px" height="12px" alt="[+]"> <span class="text-red'+addon+'">' + set[hook] +'</span>';
    }
    return context;
}

exports.addFormData = (request, key, value) => {
    if(!(request.session.formdata != null))  request.session.formdata = {};
    return request.session.formdata[key] = value; 
}

exports.getFormData = (request, key) => {
    let formdata = {};
    if(!(request.session.formdata != null))  request.session.formdata = {};
    if(request.session.formdata[key]!= null){
        formdata = request.session.formdata[key];
        delete request.session.formdata[key];
    }
    return formdata;
}

exports.formData = (set, hook, optional) => {  
    optional = !optional || typeof optional != 'string' ? '' : optional;
    return set[hook]!=null ? ( this.isEmptyString(set[hook]) ? optional : set[hook] ) : optional;
}

exports.isEmptyString = str => {
    return !String(str).trim();
}

exports.isValidEmail = email => {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
}

exports.isEmptyObject = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

exports.password_hash = password => {
    return bcrypt.hashSync(password, 10);
}

exports.verify_password = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

exports.generateToken = () => {
    let dt = new Date().getTime();
    let token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return token;
}

exports.getLoginToken = request => {
    let token = request.signedCookies != null ? request.signedCookies['__btrs_express_login_token'] : '';
    return token!=null && !this.isEmptyString(token) ? token : '';
}

exports.setLoginToken = (response, token) => {
    return response.cookie('__btrs_express_login_token', token, { signed: true });
}

exports.removeLoginToken = response => {
    return response.clearCookie('__btrs_express_login_token');
}

exports.isRoutePermitted = (permissions, route) => { 
    for(let i = 0; i<permissions.length; i++){
        let permission = permissions[i];
        if(permission instanceof RegExp) {
            if(route.match(permission)) return true;
        }
        else if(route===permission) return true;
    };
    return false;
} 

exports.allowed = (request, roles) => {
    let types = {
        'admin' : '4',
        'supportstaff' : '3',
        'busmanager' : '2',
        'counterstaff' : '1'
    }
    let converted = [];
    roles = roles.split("|");
    roles.forEach(role => {
        if(types[role]!=null) converted.push(types[role]);
    });
    return request.user.role!=null ? converted.includes(request.user.role) : false;
}
