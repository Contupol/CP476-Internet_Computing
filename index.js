const http = require("http");
const path = require('path');
const open = require("open");

const express = require("express");
const app = express();

const budget_route = require("./routes/budget.js");
const users_route = require("./routes/users.js")

const host = 'localhost';
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use('/api', budget_route);
app.use('/api/auth', users_route);
app.use('/', users_route);

app.post('/back', (req, res) => {
    const previousPage = req.headers.referer || '/';
    res.redirect(previousPage);
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

process.on('uncaughtException', (err) => {
    console.error("UNCAUGHT ERROR:", err);
});
