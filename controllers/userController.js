const userService = require("../services/userService.js");

exports.getAllUsers = (req, res) => {
    const users = userService.fetchUsers();
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const newUser = userService.addUser(req.body);
    res.status(200).json(newUser);
};