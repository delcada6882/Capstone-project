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
exports.getAllStudents = (req, res) => {
    pool.query(`SELECT * from students`, (err, results) => {
        if (err) throw err;
        return res.status(200).json(results.rows);
    });
};
exports.getSomeStudents = async (req, res) => {
    const limit = req.params.limit;
    const page = req.params.page * limit;
    const results = await pool.query('SELECT * from users LIMIT $1 OFFSET $2', [
        limit,
        page,
    ]);
    return results.rows;
};

exports.authUserByName = async (username) => {
    const results = await pool.query(
        'select * from users where username = $1',
        [username]
    );
    return results.rows[0];
};
