/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const MUsers = require(__dirname + '/../models/MUsers');
const helper = require(__dirname + '/../modules/helper');

exports.get = (request, response, next) => {
    return response.render('system/login', { 
        layout: false, 
        title: 'BTRS - Login', 
        errors: helper.getError(request, "login"),
        formdata: helper.getFormData(request, "login"),
        request: request 
    });
};

exports.post = async (request, response, next) => {
    let errors = {};
    let user = null;

    let email = request.body.email!=null ? request.body.email : '';
    let password = request.body.password!=null ? request.body.password : '';

    if(helper.isEmptyString(email)) {
        errors.email = 'Email is required';
    } else if(!helper.isValidEmail(email)) {
        errors.email = 'Invalid email address';
    } else if((user = await MUsers.getUserByEmail(email))==null) {
        errors.email = 'Email not found'
    }

    if(helper.isEmptyString(password)) {
        errors.password = 'Password is required';
    } else if(user!=null && user.password!=null && !helper.verify_password(password, user.password)) {
        errors.password = 'Password didn\'t match';
    }

    if(helper.isEmptyObject(errors)) {
        return response.redirect(helper.route(request, 'system'));
    }

    helper.addError(request, 'login', errors);
    helper.addFormData(request, 'login', {
        email : email
    });
    return response.redirect(helper.route(request, 'system/login'));
}