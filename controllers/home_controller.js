const home_service = require("../services/home_service.js");

exports.create_budget = async (req, res) => {
    const { name, description, period, value } = req.body;
    // do some validification
    const status = await home_service.create_budget(name, description, period, value, req.session.userId);
    res.redirect("/pages/home_page.html");
};

exports.delete_budget = async (req, res) => {
    const { category } = req.body;
    const status = await home_service.delete_budget(category, req.session.userId);
    res.redirect("/pages/home_page.html");
}

exports.budget_list = async (req, res) => {
    const budget_list = await home_service.budget_list(req.session.userId);
    res.json(budget_list);
}

exports.data_page = (req, res) => {
    res.redirect("/pages/budget_page.html");
}
