const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store') (session);
const flash = require('express-flash');
const conn = require('./db/conn');
const app = express();


app.use(express.json());
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({
    extended: true
}));

const Tought = require('./model/Tought');
const User = require('./model/User');


app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 36000),
        httpOnly: true,
        },
}),
)
app.use(flash());
app.use(express.static('public'));

app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session 
    }
    next();

})

conn.sync().then(() =>{
    app.listen(3000);
}).catch((err) => console.log(err));
