const users = [];

exports.fetchUsers = () => {
    return users;
};

exports.addUser = (user) => {
    users.push(user);
    return user;
};

// Not real implementation