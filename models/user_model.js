const db = require('./db.js');

async function get_user(email) {
    console.log("B");
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE Email = ?',
            [email]
        );
        console.log('C');
        if (rows.length > 0) {
            return rows[0];
        } else {
            return -1;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
    console.log("complete");
}

async function create_user(email, password) {

}

module.exports = {get_user}