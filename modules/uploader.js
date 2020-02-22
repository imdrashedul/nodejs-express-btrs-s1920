/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

const multer = require("multer");
const fs = require('fs');
const helper = require( __dirname + '/helper');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        const dir = __dirname + "/../uploads";
        if(!fs.existsSync(dir)) fs.mkdirSync(dir);
        callback(null, dir);
    },
    filename: (request, file, callback) => {
        callback(null, helper.generateNewFileName(file.originalname));
    }
});

const uploader = multer({
    storage,
    limits: {
        fileSize: 1024*1024*2.1
    },
    fileFilter: (request, file, callback) => {
        if ( !file.mimetype.includes("jpeg") && !file.mimetype.includes("jpg") && !file.mimetype.includes("png") && !file.mimetype.includes("gif")) {
            request.fileValidationError = "Only .jpg, .png, .gif images are allowed"
            return callback(null, false);
        }
        return callback(null, true);
    },
});

module.exports.single = field => {
    const handler = uploader.single(field);
    return (request, response, next) => {
        handler(request, response, function (err) {
            if(err) {
                if(err.code=='LIMIT_FILE_SIZE') {
                    request.fileValidationError = 'Files over 2MB isn\'t allowed';
                } else {
                    request.fileValidationError = 'File Couldn\'t be uploaded';
                }
            }
            return next();
        });
    }
} 