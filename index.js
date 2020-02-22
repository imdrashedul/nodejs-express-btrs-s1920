/**
 * @author MD. RASHEDUL ISLAM
 * @package Bus Ticket Reservation System
 * @version v3.0
 * @see https://github.com/rashed370/nodejs-express-btrs-s1920
 */

require(__dirname + '/modules/database');

const path = require('path');
const express = require( 'express' );
const app = express();
const router = express.Router();
const bootstrap = require(__dirname + '/bootstrap'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const auth = require(__dirname + '/modules/authenticator');
const helper = require(__dirname +'/modules/helper');

const secretSession = "gTS#2Aa9u1r%1#j52";
const secretCookie = "aDci#1$L42*1aGE,Qs"


app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'default', layoutsDir: __dirname + '/views/layouts/', helpers: helper  }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser(secretCookie));
app.use(session({secret: secretSession, saveUninitialized: true, resave: false, cookie: { maxAge: 600000 }}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/system', auth);
app.use(router);

bootstrap(app, router);

app.listen('3000', () => {
    console.log('Server Started at http://localhost:3000/');
});