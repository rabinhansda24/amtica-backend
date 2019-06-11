const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var path = require('path');
const mongoose = require('./config/database'); 
const users = require('./routes/users');
const logs = require('./routes/logs');
const file = require('./routes/fileRoute');



const app = express();

app.set('secretKey', 'nodeRestApi'); 
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     next();
//   });


// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', function(req, res){
 res.json({"data" : "Hello World"});
});

// public route
app.use('/users', users);

// private route
app.use('/logs', validateUser, logs);
app.use('/file', validateUser, file);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});


function validateUser(req, res, next) {
    console.log(req.headers);
    jwt.verify(req.headers['authorization'], req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
    
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
    console.log(err);
    
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else 
        res.status(500).json({message: "Something looks wrong :( !!!"});
   
});


app.listen(3000, () => { 
    console.log('Node server listening on port 3000');
});