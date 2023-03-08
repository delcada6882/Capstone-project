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

exports.getSomeClasses = async (req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const results = await pool.query('SELECT * from classes LIMIT $1 OFFSET $2', [
        limit,
        page,
    ]);
    return res.status(200).json(results.rows);
};

exports.getSomeStudents = async (req, res) => {
    const limit = req.params.limit;
    const page = req.params.page;
    const results = await pool.query('SELECT * from students LIMIT $1 OFFSET $2', [
        limit,
        page,
    ]);
    return res.status(200).json(results.rows);
};
exports.getStudentsByClass = async (req, res) => {
    const class_id = req.params.class_id
    const results = await pool.query(`select * from students where student_id = (select student_id from assignments where class_id = $1)`, [class_id]);
    return res.status(200).json(results.rows)
};

exports.getStudentByEmail = async (email) => {
    const results = await pool.query(
        'select * from students where email = $1',
        [email]
    );
    return results.rows[0];
};

exports.getStudentById = async (student_id) => {
    const results = await pool.query(
        'select * from students where student_id = $1',
        [student_id]
    );
    return results.rows[0];
};