/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const datetime = require('node-datetime');
const bcrypt = require('bcrypt');
const md5 = require('md5');

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
    return datetime.create(new Date()).format(expression);
}

exports.copyright = () => {
    let year = this.now('Y');
    return year=='2019'?year:'2019-'+year;
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

exports.addAlert = (value = {}, request, key = "") => {
    if(request.session.alerts==null) request.session.alerts = {}
    if(!this.isEmptyString(key)) {
        if(request.session.alerts[key]==null) request.session.alerts[key] = [];
        request.session.alerts[key].push(value);
    } else {
        if(request.session.alerts['__GLOBAL__']==null) request.session.alerts['__GLOBAL__'] = [];
        request.session.alerts['__GLOBAL__'].push(value);
    }
}

exports.flashAlert = (request, key) => {
    let alerts = '';
    if(request.session.alerts!=null && typeof request.session.alerts == 'object' && Object.keys(request.session.alerts).length>0) {
        if( request.session.alerts['__GLOBAL__'] != null && typeof request.session.alerts['__GLOBAL__'] == 'object') {
            request.session.alerts['__GLOBAL__'].forEach(alert => {
                if(typeof alert == 'object') {
                    alerts += this.renderAlert(alert);
                }
            });
            delete request.session.alerts['__GLOBAL__'];
        }

        if(!this.isEmptyString(key)) {
            if( request.session.alerts[key]!=null && typeof request.session.alerts[key] == 'object') {
                request.session.alerts[key].forEach(alert => {
                    if(typeof alert == 'object') {
                        alerts += this.renderAlert(alert);
                    }
                });
                delete request.session.alerts[key];
            }
        }

        if(request.session.alerts!=null && !(request.session.alerts.length>0)) delete request.session.alerts;
    }
    return alerts;
}

exports.renderAlert = alert => {
    let content = '';
    if(alert['m']!=null && alert['t']!=null) {
        let id = '__acl' + md5(Date.now());
        content += '<div class="alert '+alert['t']+'" id="'+id+'">';
        content += this.escapeHtml(alert['m']);
        if(alert['a']!=null) {
            content += '<script>';
            content += "setTimeout(function(){ document.getElementById('"+id+"').remove() }, "+alert['a']+");";
            content += '</script>'
        }
        content += '</div>';
    }
    return content;
}

exports.escapeHtml = unsafe => {
    return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    str = String(str).trim();
    return str==null || !(str.length>0);
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

// HTML Select/Radio/Checkbox Selection Provider
exports.selected = (fixed, variable, type, strict) => {
    type = !type || typeof type != 'string' ? 'select' : type;
    strict = !strict || typeof strict != 'boolean' ? false : strict;
    let flag = fixed==variable?(strict?(fixed===variable):true):false;

    if(type=='select') {
        return flag ? ' selected':'';
    } else if(type=='checkbox' || type=='radio') {
        return flag ? ' checked':'';
    }

    return '';
}

// Day - Month - Year Dropdown/Raw Serviece Provider
exports.dmyProvider = (target, option, selected) => {
    target = !target || typeof target != 'string' ? 'day' : target;
    option = !option || typeof option != 'boolean' ? false : option;
    selected = !selected || typeof selected != 'string' ? '' : selected;

    if(target=="day") {
        let days = [];
        for(let i = 1; i<=31; i++) {
            let val = String(i).padStart(2, "0");
            days.push(option ? '<option value="'+val+'"'+this.selected(selected, val)+'>'+String(i)+'</option>': val)
        }
        return option ? days.join(' ') : days;
    } else if(target=="month") {
        let months = {
            '01' : 'January',
		    '02' : 'February',
		    '03' : 'March',
		    '04' : 'April',
		    '05' : 'May',
		    '06' : 'June',
		    '07' : 'July ',
		    '08' : 'August',
		    '09' : 'September',
		    '10' : 'October',
		    '11' : 'November',
		    '12' : 'December'
        }

        let print = [];

        for( const [numeric, alpha] of Object.entries(months)) {
            print.push(option ? '<option value="'+numeric+'"'+this.selected(selected, numeric)+'>'+alpha+'</option>': numeric)
        }

        return option ? print.join(" ") : print;
    } else if(target=='year') {
        let years = [];
        let currentYear = this.now("Y");
        let limit = 0;

        while(limit<100) {
            let val = currentYear-limit++;
            years.push(option ? '<option value="'+String(val)+'"'+this.selected(selected, val)+'>'+String(val)+'</option>': val);
        }

        return option ? years.join(" ") : years;
    }

    return option ? '' : [];
}

exports.objvalue = (obj, key, def) => {
    return obj[key]!=null ? obj[key] : def;
}

exports.hasobjitem = (obj, key) => {
    return obj[key]!=null;
}

exports.resources = (obj, type) => {
    let resources = "";
    if(obj!=null) {
        obj.forEach(resource => {
            if(type=='css') {
                resources += '<link rel="stylesheet" href="';
                resources += resource;
                resources += '">';
            } else if(type=='js') {
                resources +='<script type="text/javascript" src="';
                resources += resource;
                resources += '"></script>';
            } else {
                resources += resource; 
            }
        }); 
    }
     
    return resources; 
}

exports.generateRandom = (length = 10) => {
    let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generated = '';
    for ( var i = 0; i < length; i++ ) {
        generated += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return generated;
}

exports.verifyCharecter = str => {
	const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.- ';
	
	for(let i = 0; i<str.length; i++) {
		if(allowed.indexOf(str[i])<0) {
			return false;
		}
	}
	
	return !this.isEmptyString(str);
}

exports.generateNewFileName = original => {
    let ext = original.split(".").pop();
    return md5( Date.now() + this.generateRandom() ) + '.' + ext;
}

exports.ctype_alpha = alpha => {
    const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return !(allowed.indexOf(alpha)<0); 
}

exports.is_numeric = number => {
    const allowed = '0123456789';
    for(let i = 0; i<number.length; i++) {
		if(allowed.indexOf(number[i])<0) {
			return false;
		}
	}
    return true; 
}

exports.verifyDob = (day, month, year) => {
	let max = parseInt(this.now("Y"));
	let min = max-99;
	if( day.length==2 && month.length==2 && year.length==4 ) {
		if( this.is_numeric(day) && this.is_numeric(month) && this.is_numeric(year) ) {
			return (day>=1 && day<=31 && month>=1 && month<=12 && year>=min && year<=max);
		}
    }
	return false;
}

//Clean Mobile Number
exports.cleanBDMobile = number => {
    let cleaned = '';
    if(!this.isEmptyString(number)) {
        //Remove all the white space from the string
        cleaned = number.split(' ').join('');
        //Remove all the - from the string
        cleaned = cleaned.replace('-', '');
        //Check for the pattern(+880)/(+88) Exists, then remove it
        let pos = cleaned.indexOf(')');
        cleaned = pos>=0 ? cleaned.substr(pos+1) : cleaned;
        //Remove all unexpected character
        cleaned = cleaned.replace('(', '');
        cleaned = cleaned.replace(')', '');
        //Check for the pattern +88 Exists then remove it
        cleaned = cleaned.substr(0, 3) == '+88' ? cleaned.substr(cleaned, 3) : cleaned;
        //Remove all + character if not removed by any chance
        cleaned = cleaned.replace('+', '');
        //Check for number is less than 11 digit and there is no 0 before string, then simply add it
        cleaned = cleaned.length<11 && cleaned[0]==0 ? '0'+cleaned : cleaned;
    }
    return cleaned;
}

//Valid Mobile Number
exports.verifyBDMobile = number => { 
    if(!this.isEmptyString(number)) {
        let operators = ['017', '018', '019', '015', '016', '013'];
        number = this.cleanBDMobile(number);
        if(number.length==11) {
            return operators.includes(number.substr(0, 3))
        }
    }
    return false;
}
// Alpha - Numeric String Verification Service Provider
exports.verifyAlphaNumeric = str =>  {
	let alpha = 0; let numeric = 0;
	for(let i=0; i<str.length; i++) {
		if(this.ctype_alpha(str[i])) alpha++;
		if(this.is_numeric(str[i])) numeric++;
	}

	return alpha > 0 && numeric > 0;
}

