const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

//control where files get stored
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
        ) {
        cb(null, true);
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json()); // application/json
app.use (multer({ storage: fileStorage, fileFilter: fileFilter}).single('image'));

//middleware for serving static files/images
//path join will construct an absolute path to images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode;
    const message = err.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
});


mongoose
.connect(
    'mongodb+srv://gia-edgington:password_db@clusternode-szpnr.mongodb.net/messages?retryWrites=true'
)
.then(result => {
    app.listen(8080);
}).catch(err => {
    console.log(err)
});
