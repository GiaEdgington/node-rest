const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

const bodyParser = require('body-parser');


app.use('/feed', feedRoutes);

app.listen(8080);