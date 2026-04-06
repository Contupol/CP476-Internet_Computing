const bcrypt = require('bcrypt');
const user_model = require('../models/user_model.js');

exports.get_user = async (email, pass) => {
    const user = await user_model.get_user(email);
    if (!user) return -1;
    const valid = await bcrypt.compare(pass, user.Password);
    if (!valid) return -2;
    return user;
}

exports.register_user = async (fname, lname, email, pass, passc) => {
    if (pass != passc) {
        return -1;
    }
    return await user_model.create_user(fname, lname, email, pass);
}

exports.fetchUsers = () => {
    return users;
};

exports.addUser = (user) => {
    users.push(user);
    return user;
};

// Not real implementation