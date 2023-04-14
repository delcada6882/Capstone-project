const bcrypt = require('bcryptjs');
const { getStudentByEmail, getStudentById } = require('.././db/dbIndex');
const localStrategy = require('passport-local').Strategy;

const matchPassword = async (password, studentPassword) => {
    const salt = bcrypt.genSaltSync(11);
    const hash = await bcrypt.hash(password, salt);
    const result = await bcrypt.compare(studentPassword, hash);
    return result;
};

module.exports = function (passport) {
    passport.use(
        'local-login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async function (email, password, done) {
                try {
                    const student = await getStudentByEmail(email);
                    if (!student) return done(null, false);
                    const pass = await matchPassword(
                        password,
                        student.password
                    );
                    if (!pass) return done(null, false);
                    return done(null, {
                        student_id: student.student_id,
                        email: student.email,
                    });
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    passport.serializeUser(function (student, done) {
        done(null, student.student_id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const student = await getStudentById(id);
            done(null, student);
        } catch (err) {
            if (err) done(err);
        }
    });
};
