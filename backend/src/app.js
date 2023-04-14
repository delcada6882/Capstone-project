const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const {
    getSomeStudents,
    addStudent,
    getStudentById,
    getAllStudents,
    getAllClasses,
    getAllAdministrators,
    getAllContacts,
} = require('./db/dbIndex');

const app = express();

const port = process.env.PORT || 3002;

const memoryStore = new session.MemoryStore();

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(cookieParser('secretcode-pg'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secretcode-pg',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);
// app.use((req, res, next) => {
//     console.log(`${req.method}:${req.url}`);
//     console.log(memoryStore);
//     next();
// });
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

// ADMINISTRATORS
app.get('/getAllAdministrators', getAllAdministrators);
app.get('/getAdministratorById/:administrator_id', async (req, res) => {
    return await getAdministratorById(req.params.administrator_id);
});

// STUDENTS
app.get('/getAllStudents', getAllStudents);
app.get('/getSomeStudents/:page/:limit', getSomeStudents);
app.get('/getStudentById/:student_id', async (req, res) => {
    return await getStudentById(req.params.student_id);
});

// CLASSES
app.get('/getAllClasses', getAllClasses);
app.get('/getClassById/:class_id', async (req, res) => {
    return await getClassById(req.params.class_id);
});

// CONTACTS
app.get('/getAllContacts', getAllContacts);
app.get('/getContactById/:contact_id', async (req, res) => {
    return await getContactById(req.params.contact_id);
});

app.post(
    '/login',
    passport.authenticate('local-login', {
        failureMessage: 'Not a vaild user name or password',
    }),
    (req, res) => {
        res.send(JSON.stringify(true));
    }
);

app.post('/addStudent', async (req, res) => {
    const studentJSON = req.body;
    const computed = {
        student_id: studentJSON?.student_id,
        first_name: studentJSON.first_name,
        last_name: studentJSON.last_name,
        password: studentJSON?.password,
        email: studentJSON.email,
        verified: studentJSON?.verified,
        contact: studentJSON?.contact,
        created: studentJSON?.created,
    };
    let response = await addStudent(computed);
    return res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`connected on port ${port}`);
});
