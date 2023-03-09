const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const {
    getAllStudents,
    getSomeStudents,
    getAllClasses,
    getStudentByEmail,
} = require('./db/dbIndex');

const app = express();

const port = process.env.PORT || 3002;

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secretcode-pg',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser('secretcode-pg'));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportIndex')(passport);


app.get('/', (req, res) => {
    res.send('Hello World');
    // res.sendFile('experiments/form.html', { root: __dirname });
});

app.get('/get', (req, res) => {
    res.send('Hello World');
});

app.get('/getAllStudents', getAllStudents);
app.get('/getSomeStudents/:page/:limit', getSomeStudents);
app.get('/getAllClasses', getAllClasses);

app.post('/login', passport.authenticate('local-login', {
        failureMessage: 'Not a vaild user name or password',
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect('/login')
    }
);

app.listen(port, () => {
    console.log(`connected on port ${port}`);
});
