var express = require('express'),
mongoose = require('mongoose'),
morgan = require('morgan'),
cors = require('cors'),
helmet = require('helmet'),
bodyParser = require('body-parser');
var secret = require('./config/secret');

mongoose.Promise = global.Promise;
mongoose.connect(secret.database);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan('Dev'));
app.use(cors());

var internRoute = require('./routes/intern.route');

app.use('/intern', internRoute);

app.listen(secret.port, function(){
    console.log('Live on port: ', secret.port);
});