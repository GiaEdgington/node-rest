const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); // application/json

//middleware for serving static files/images
//path join will construct an absolute path to images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(err);
    const status = erro.statusCode;
    const message = error.message;
    res.status(status).json({ message: message })
})


mongoose
.connect(
    'mongodb+srv://gia-edgington:password_db@clusternode-szpnr.mongodb.net/messages?retryWrites=true'
)
.then(result => {
    app.listen(8080);
}).catch(err => {
    console.log(err)
});
