const home_service = require('../services/home_service.js');
const db = require('./db.js');

async function create_budget(name, desc, period, value, uId) {
    if (!name || !desc || !period || !value || !uId) {
        return { success: false, message: "Fill all fields" };
    }
    try {
        const [result] = await db.query(`
                INSERT into Budget (uID, bName, Description, Goal, Period)
                VALUES(?, ?, ?, ?, ?)`,
            [uId, name, desc, value, period]
        )
        return { success: true, message: "Added new budget entry." };
    } catch (err) {
        console.error(err);
        return { success: false, message: "Failed to add budget entry." }
    }
}

async function delete_budget(name, uId) {
    try {
        const [result] = await db.query(`
            DELETE FROM Budget WHERE bID = ? AND uID = ?`,
        [name, uId]);
        return {success: true, message: "Deleted entry"};
    } catch (err) {
        console.error(err);
        return {success: false, message: "Failed to delete entry"};
    }
}

async function budget_list(uId) {
    try {
        const [rows] = await db.query(
            'SELECT bID, bName FROM Budget WHERE uID = ?',
            [uId]
        );
        return rows;
    } catch (err) {
        console.error(err);
    }
}


module.exports = { create_budget, delete_budget, budget_list };