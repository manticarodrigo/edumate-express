const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseConfig = require('./config/database');
var router = require('./app/routes');

mongoose.connect(databaseConfig.url, {
  useMongoClient: true
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port" + port);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);