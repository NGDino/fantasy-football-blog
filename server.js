const path = require('path'); // path to public
const express = require('express') //install express
const routes = require('./controllers'); //get routes
const seqelize = require('./config/connection');//connect to DB connection

require('dotenv').config(); //env file

const app = express(); //define app

const hbs = exphbs.create({}); //express handlebars

const PORT = process.env.PORT || 3001; //use port 3001

const session = require('express-session'); // install sessions

const SequelizeStore = require('connect-session-sequelize')(session.Store); 

//set up session
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess))

//handlebars default engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);//use routes

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});