const db = require('./db.js');
const bcrypt = require('bcrypt');

async function get_user(email) {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE Email = ?',
            [email]
        );
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function create_user(fname, lname, email, pass) {
    try {
        const hashed_pass = await bcrypt.hash(pass, 10);
        const [result] = await db.query(
                `INSERT into users (uName, LastName, Email, Password)
                VALUES(?, ?, ?, ?)`,
                [fname, lname, email, hashed_pass]
            )
        const [users] = await pool.query('SELECT * FROM users WHERE uID = ?', [newUserID]);
        return { success: true, message: "Created user.", user: users[0]};
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return { success: false, message: "Duplicate email."};
        }
        throw err;
    }
}

module.exports = {get_user, create_user};