const bcrypt = require('bcryptjs');
const { getStudentByEmail, getStudentById } = require('../db/dbIndex');
const localStrategy = require('passport-local').Strategy;

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
};

module.exports = function (passport) {
    passport.use(
        'local-login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async function (req, email, password, done) {
                try {
                    const student = await getStudentByEmail(email);
                    if (!student) return done(null, false);
                    return done(null, {
                        student_id: student.student_id,
                        email: student.email,
                    });
                } catch (error) {
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
