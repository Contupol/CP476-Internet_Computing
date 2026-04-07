const home_model = require('../models/home_model')

exports.create_budget = async (name, desc, period, value, uId) => {
    return await home_model.create_budget(name, desc, period, value, uId);
}

exports.delete_budget = async (name, uId) => {
    return await home_model.delete_budget(name, uId);
}

exports.budget_list = async (userId) => {
    return await home_model.budget_list(userId);
}