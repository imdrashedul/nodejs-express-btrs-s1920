const path = require('path');
const express = require( 'express' );
const app = express();
const router = express.Router();
const bootstrap = require('./bootstrap'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'  }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

bootstrap(app, router);

app.listen('3000', () => {
    console.log('Server Started at http://localhost:3000/');
});