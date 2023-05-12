const Pool = require('pg').Pool;

let dbURL = {
    connectionString:
        process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/Capstone',
};

const pool = new Pool(dbURL);
const queryCallback = (err, results) => {
    if (err) throw err;
    return res.status(200).json(results.rows);
};

pool.connect();

exports.getSomeClasses = async (req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const results = await pool.query(
        'SELECT * from classes LIMIT $1 OFFSET $2',
        [limit, page]
    );
    return res.status(200).json(results.rows);
};
exports.getSomeStudents = async (req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const results = await pool.query(
        'SELECT * from students LIMIT $1 OFFSET $2',
        [limit, page]
    );
    return res.status(200).json(results.rows);
};
exports.getStudentsByClass = async (req, res) => {
    const class_id = req.params.class_id;
    const results = await pool.query(
        `select * from students where student_id = (select student_id from assignments where class_id = $1)`,
        [class_id]
    );
    return res.status(200).json(results.rows);
};
exports.getStudentByEmail = async (email) => {
    const results = await pool.query(
        'select * from students where email = $1',
        [email]
    );
    return results.rows[0];
};

exports.getAdministratorById = async (administrator_id) => {
    const results = await pool.query(
        'select * from administrators where administrator_id = $1',
        [administrator_id]
    );
    return results.rows[0];
};
// exports.getClassById = async (class_id) => {
//     const results = await pool.query(
//         'select * from classes where class_id = $1',
//         [class_id]
//     );
//     return results.rows[0];
// };

exports.getClassById = async (req, res) => {
    const class_id = req.params.class_id;
    const results = await pool.query(
        `select * from classes where class_id = $1`,
        [class_id]
    );
    return res.status(200).json(results.rows);
};
exports.getStudentById = async (student_id) => {
    const results = await pool.query(
        'select * from students where student_id = $1',
        [student_id]
    );
    return results.rows[0];
};

exports.getAllStudents = async (req, res) => {
    pool.query(`SELECT * from students`, (err, results) => {
        if (err) throw err;
        return res.status(200).json(results.rows);
    });
};
exports.getAllClasses = async (req, res) => {
    pool.query(`SELECT * from classes`, (err, results) => {
        if (err) throw err;
        return res.status(200).json(results.rows);
    });
};
exports.getAllAdministrators = async (req, res) => {
    pool.query(`SELECT * from administrators`, (err, results) => {
        if (err) throw err;
        return res.status(200).json(results.rows);
    });
};
exports.getAllContacts = async (req, res) => {
    pool.query(`SELECT * from contacts`, (err, results) => {
        if (err) throw err;
        return res.status(200).json(results.rows);
    });
};

exports.addStudent = async (studentJSON) => {
    try {
        if (await this.getStudentByEmail(studentJSON.email)) {
            return {
                data: false,
                statusText: 'student email already exists',
            };
        }
        await pool.query(
            `insert into students (first_name, last_name, password, email, verified, contact)
         values ($1, $2, $3, $4, $5, $6)`,
            [
                studentJSON.first_name,
                studentJSON.last_name,
                studentJSON.password,
                studentJSON.email,
                studentJSON.verified,
                studentJSON.contact,
            ]
        );
        const newlyAdded = await this.getStudentByEmail(studentJSON.email);
        return {
            data: newlyAdded,
            statusText: 'Student successfully added',
        };
    } catch (error) {
        console.error(error);
        return {
            data: false,
            statusText: 'Internal server error',
        };
    }
};
