const http = require("http");
const path = require('path');
const open = require("open");

const express = require("express");
const session = require("express-session");

const app = express();

const home_route = require("./routes/home.js");
const users_route = require("./routes/users.js")

// const host = 'localhost';
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "so_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use('/home', home_route);
app.use('/', users_route);

function auth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    next();
}

app.use(express.static(__dirname));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// app.post('/back', (req, res) => {
//     const previousPage = req.headers.referer || '/';
//     res.redirect(previousPage);
// })

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

process.on('uncaughtException', (err) => {
    console.error("UNCAUGHT ERROR:", err);
});
