/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

var dateFormat = require('dateformat');

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
    icon = !icon || typeof icon != 'String' ? 'assets/img/it.png' : icon
    asset = !asset || typeof asset != 'String' ? 'system/' : asset
	context += '<a href="'+this.route(request, 'system/'+href)+'"'+(slug==active?' class="active"':'')+'>';
    context += '<img src="'+this.asset(request, asset+icon)+'"> ';
	context += title;
	context += '</a>';
    context += '</li>';
    return context;
} 