const http = require("http");
const path = require('path');
const open = require("open");

const express = require("express");
const app = express();

const budget_route = require("./routes/budget.js");
const users_route = require("./routes/users.js")

const host = 'localhost';
const port = 8000;

app.use(express.json());
app.use('/api', budget_route);
app.use('/api', users_route);

app.listen(host, port, () => {
    console.log(`Server running on ${port}`)
    open(`http://localhost:8000/`)
});
