// contains all events tied with a user
const path = require('path');

const bcrypt = require('bcrypt');
const user_model = require('../models/user_model.js');
const userService = require("../services/user_service.js");

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
        const user = await user_model.get_user(email);
        console.log(user);
        if (user != -1) {
            const match = await bcrypt.compare(password, user[0].password);
            if (match) {
                res.status(202).send("Logging in");
            } else {
                res.status(401).send("Invalid credentials");s
            }
        } else {
            res.status(404).send("Not a user");
        }
    } catch (err) {
        res.status(500).send("Error server-side.");
    }
}

exports.signUp = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/sign_up.html'));
}

exports.register = (req, res) => {
    res.send("Registered");
}

exports.getAllUsers = (req, res) => {
    const users = userService.fetchUsers();
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const newUser = userService.addUser(req.body);
    res.status(200).json(newUser);
};