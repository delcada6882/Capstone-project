const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { getAllStudents, getSomeStudents, getAllClasses } = require('./db/dbIndex');

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

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/get', (req, res) => {
    res.send('Hello World');
});

app.get('/getAllStudents', getAllStudents);
app.get('/getSomeStudents/:page/:limit', getSomeStudents)
app.get('/getAllClasses', getAllClasses)

app.listen(port, () => {
    console.log(`connected on port ${port}`);
});
