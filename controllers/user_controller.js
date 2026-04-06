// contains all events tied with a user
const path = require('path');

const user_service = require("../services/user_service.js");

exports.entry = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/sign_in.html'));
}

exports.signIn = async (req, res) => {
    // do some data access and login user or not
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("Missing email or password.");
            return;
        }
        const user = await user_service.get_user(email, password);
        console.log(user);
        switch (user) {
            case -1:
                res.status(404).send("User with email not found.");
                return;
            case -2:
                res.status(400).send("Wrong password.");
                return;
        }
        res.status(202).send("Logging in");
    } catch (err) {
        res.status(500).send("Error server-side.");
    }
}

exports.signUp = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/sign_up.html'));
}

exports.register = async (req, res) => {
    const { fname, lname, email, password, passwordc } = req.body;
    const status = await user_service.register_user(fname, lname, email, password, passwordc);
    if (status.success === true) {
        res.status(400).sendFile(path.join(__dirname, '../pages/home_page.html'));        
    } else {
        res.status(500).send(status.message);
    }
}

exports.getAllUsers = (req, res) => {
    const users = user_service.fetchUsers();
    res.status(200).json(users);
};
