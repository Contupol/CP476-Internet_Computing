const http = require("http");
const path = require('path');
const open = require("open");

const express = require("express");
const app = express();


const firstPageRoutes = require("./routes/userRoutes.js");
const secondPageRoutes = requite("./routes/secondRoutes.js")
const thirdPageRoutes = requite("./routes/thirdRoutes.js")

const host = 'localhost';
const port = 8000;

app.use(express.json());
app.use('/api', firstPageRoutes);
app.use('/api', secondPageRoutes)
app.use('/api', thirdPageRoutes)

app.listen(host, port, () => {
    console.log(`Server running on ${port}`)
    open(`http://localhost:8000/`)
});
