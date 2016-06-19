var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-009876-54321')); //secret key

function auth(req, res, next){
    console.log(req.headers);
    if (!req.signedCookies.user) {
        var authHearder = req.headers.authorization;
        if (!authHearder){
            var err = new Error('You are not authorized');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHearder.split(' ')[1],
            'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password'){
            res.cookie('user', 'admin', {signed: true});
            next();
        }else{
            var err = new Error('You are not authenticated');
            err.status = 401;
            next(err);
        }
    } else {
        if (req.signedCookies.user == 'admin') {
            console.log(req.signedCookies.user);
            next();
        }else {
            var err = new Error('You are not authenticated');
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);
app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
    next();
});

app.listen(port, hostname, function(){
    console.log('Server running at http://'+hostname+':'+port+'/');
});
