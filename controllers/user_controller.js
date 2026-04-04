// contains all events tied with a user

const userService = require("../services/user_service.js");

exports.getAllUsers = (req, res) => {
    const users = userService.fetchUsers();
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const newUser = userService.addUser(req.body);
    res.status(200).json(newUser);
};