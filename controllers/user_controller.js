// contains all events tied with a user
const path = require('path');

const userService = require("../services/user_service.js");

exports.entry = (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/sign_in.html'));
}

exports.signIn = (req, res) => {
    // do some data access and login user or not
    res.send('Not implemented');
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