/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const helper = require(__dirname + '/../modules/helper');
const MUsers = require(__dirname + '/../models/MUsers');
const MUserDetails = require(__dirname + '/../models/MUserDetails');
const fs = require('fs');

exports.index = (request, response, next) => {
    return response.render('system/supportstaff/index', { 
        layout: 'system', 
        title: 'Manage Support Staff', 
        active:'supportstaff', 
        navigations: [], 
        request: request 
    });
};

exports.addget = (request, response, next) => {
    return response.render('system/supportstaff/add', { 
        layout: 'system', 
        title: 'Add Support Staff', 
        active:'supportstaff', 
        navigations: [
            [ "system/supportstaff", "Manage Support Staff" ]
        ], 
        extrajs: [
            helper.asset(request, 'system/assets/js/pages/supportstaff/add.js'),
        ],
        errors: helper.getError(request, "addsupportstaff"),
        formdata: helper.getFormData(request, "addsupportstaff"),
        request: request 
    });
};

// exports.uploadPhoto = (request, response, next) => {
//     uploader(request, response, function (err) {
//         if(err) {
//             if(err.code=='LIMIT_FILE_SIZE') {
//                 request.fileValidationError = 'Files over 2MB isn\'t allowed';
//             } else {
//                 request.fileValidationError = 'File Couldn\'t be uploaded';
//             }
//         }
//         return next();
//     });
    
// }

exports.addpost = async (request, response, next) => {

    let errors = {};

    //Personal Information
    let fname = request.body['first_name']!=null ? request.body['first_name'].trim() : '';
    let lname = request.body['last_name']!=null ? request.body['last_name'].trim() : '';
    let dobDay = request.body['dob_day']!=null ? request.body['dob_day'] : '';
    let dobMonth = request.body['dob_month']!=null ? request.body['dob_month'] : '';
    let dobYear = request.body['dob_year']!=null ? request.body['dob_year'] : '';
    let gender = request.body['gender']!=null ? request.body['gender'] : '';
    let marital = request.body['marital_status']!=null ? request.body['marital_status'] : '';
    let nidpassport = request.body['nid_passport']!=null ? request.body['nid_passport'] : '';
    let dob = dobYear + '-' + dobMonth + '-' + dobDay;

    //Contact Information
    let street = request.body['street']!=null ? request.body['street'] : '';
    let mobile = request.body['mobile']!=null ? request.body['mobile'] : '';
    let city = request.body['city']!=null ? request.body['city'] : '';
    let zip = request.body['zip']!=null ? request.body['zip'] : '';
    let country = request.body['country']!=null ? request.body['country'] : '';

    //Official Information
    let hourlyrate = request.body['hourlyrate']!=null ?  request.body['hourlyrate'] : '';
    let activehours = request.body['activehours']!=null ?  request.body['activehours'] : '';

    //Login Information
    let email = request.body['usermail']!=null ? request.body['usermail'].trim() : '';
    let password = request.body['password']!=null ?  request.body['password'] : '';
    let repassword = request.body['password']!=null ?  request.body['repassword'] : '';

    //Validation Set Of 'First Name'
    if(helper.isEmptyString(fname)) {
        errors['first_name'] = 'Cannot be empty';
    } else if(fname.length<=2) {
        errors['first_name'] = 'Contains at least two words';
    } else if(!helper.verifyCharecter(fname)) {
        errors['first_name'] = 'Can contain a-z or A-Z or dot(.) or dash(-)';
    } else if(fname[0]==null || !helper.ctype_alpha(fname[0])) {
        errors['first_name'] = 'Must start with a letter';
    }

    //Validation Set Of 'Last Name'
    if(helper.isEmptyString(lname)) {
        errors['last_name'] = 'Cannot be empty';
    } else if(lname.length<=2) {
        errors['last_name'] = 'Contains at least two words';
    } else if(!helper.verifyCharecter(lname)) {
        errors['last_name'] = 'Can contain a-z or A-Z or dot(.) or dash(-)';
    } else if(lname[0]==null || !helper.ctype_alpha(lname[0])) {
        errors['last_name'] = 'Must start with a letter';
    }

    //Validation Set Of 'DOB'
    if(helper.isEmptyString(dobDay) || helper.isEmptyString(dobMonth) || helper.isEmptyString(dobYear)) {
        errors['dob'] = 'At least one of them has to be selected';
    } else if(!helper.verifyDob(dobDay, dobMonth, dobYear)) {
        errors['dob'] = 'Must be a valid number (dd: 1-31, mm: 1-12, yyyy: 1900-2019)';
    }

    //Validation Set Of 'Gender'
    if(helper.isEmptyString(gender)) {
        errors['gender'] = 'At least one of them has to be selected';
    }

    //Validation Set Of Marital Status
    if(helper.isEmptyString(marital)) {
        errors['marital_status'] = 'At least one of them has to be selected';
    }

    //Validation Set Of NID/Passport
    if(helper.isEmptyString(nidpassport)) {
        errors['nid_passport'] = 'Cannot be empty';
    }
    
    //Validation Set Of Photograph
    if(request.fileValidationError) {
        errors['photograph'] = request.fileValidationError;
    } else if(!request.fileValidationError && !request.file) {
        errors['photograph'] = 'Cannot be empty';
    }

    //Validation Set Of Street Address
    if(helper.isEmptyString(street)) {
        errors['street'] = 'Cannot be empty';
    }

    //Validation Set Of Mobile Number
    if(helper.isEmptyString(mobile)) {
        errors['mobile'] = 'Cannot be empty';
    } else if(!helper.verifyBDMobile(mobile)) {
        errors['mobile'] = 'Invalid mobile number. we allowed bd operators only';
    }

    //Validation Set Of City
    if(helper.isEmptyString(city)) {
        errors['city'] = 'Cannot be empty';
    }

    //Validation Set Of Zip
    if(helper.isEmptyString(zip)) {
        errors['zip'] = 'Cannot be empty';
    }

    //Validation Set Of Country
    if(helper.isEmptyString(country)) {
        errors['country'] = 'At least one of them has to be selected';
    }

    //Validation Set Of 'Email'
    if(helper.isEmptyString(email)) {
        errors['usermail'] = 'Cannot be empty';
    } else if(!helper.isValidEmail(email)) {
        errors['usermail'] = 'Must be a valid email address (i.e anything@example.com)';
    }
    else if((user = await MUsers.getUserByEmail(email))!=null) {
        errors['usermail'] = 'Email is already used. Please provide a new one';
    }

    //Validation Set Of 'Password'
    if(helper.isEmptyString(password)) {
        errors['password'] = 'Cannot be empty';
    } else if(password.length<=4 || password.length>16) {
        errors['password'] = 'Must be 4 to 16 characters long';
    } else if(!helper.verifyAlphaNumeric(password)) {
        errors['password'] = 'Must be alpha-numeric. Combination of Alphabet and Number';
    }

    //Validation Set Of 'Re-Type Password'
    if(helper.isEmptyString(repassword)) {
        errors['repassword'] = 'Cannot be empty';
    } else if(password!=repassword) {
        errors['repassword'] = 'Password doesn\'t match';
    }

    if(helper.isEmptyObject(errors)) {

        user = await MUsers.addUser({
            email: email,
            password: helper.password_hash(password),
            gender: gender,
            role: 3,
            valid: 1,
            registered: helper.now("Y-m-d H:M:S")
        });

        await MUserDetails.addBulk([
            MUserDetails.map([user.id, 'firstname', fname]),
            MUserDetails.map([user.id, 'lastname', lname]),
            MUserDetails.map([user.id, 'birthdate', dob]),
            MUserDetails.map([user.id, 'maritalstatus', marital]),
            MUserDetails.map([user.id, 'nidpassport', nidpassport]),
            MUserDetails.map([user.id, 'avatar', request.file.filename]),
            MUserDetails.map([user.id, 'street', street]),
            MUserDetails.map([user.id, 'mobile', helper.cleanBDMobile(mobile)]),
            MUserDetails.map([user.id, 'city', city]),
            MUserDetails.map([user.id, 'zip', zip]),
            MUserDetails.map([user.id, 'country', country]),
            MUserDetails.map([user.id, 'hourlyrate', hourlyrate]),
            MUserDetails.map([user.id, 'activehours', activehours])
        ]);

        helper.addAlert({
            't' : 'success',
            'm' : fname + ' ' + lname + ' Added Successfully',
            'a' : 6000
        }, request, 'supportstaff');

        return response.redirect(helper.route(request, 'system/supportstaff'));        
    }

    if(request.file!=null && request.file.filename!=null && request.file.path) {
        if(fs.existsSync(request.file.path)) {
            fs.unlinkSync(request.file.path);
        }
    }

    helper.addError(request, 'addsupportstaff', errors);
    helper.addFormData(request, 'addsupportstaff', request.body);
    return response.redirect(helper.route(request, 'system/supportstaff/add'));
};

