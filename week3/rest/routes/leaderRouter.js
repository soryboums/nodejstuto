var express = require('express');
var bodyParser = require('body-parser');

var Learder = require('../models/leadership');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')


.get(function(req, res, next){
    Learder.find({}, function(err, leaders){
        if (err) throw err;
        res.json(leaders);
    });
})

.post(function(req, res, next){
    Learder.create(req.body, function(err, leader){
        if (err) throw err;
        var id = leader._id;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Added a new leader with id: '+id);
        // res.json(leader);
    });
})

.delete(function(req, res, next){
    Learder.remove({}, function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
})

leaderRouter.route('/:leaderId')

.get(function(req, res, next){
    Learder.findById(req.params.leaderId, function(err, leader){
        if (err) throw err;
        res.json(leader);
    });
})

.put(function(req, res, next){
    Learder.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, leader){
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function(req, res, next){
    Learder.findByIdAndRemove(req.params.leaderId, function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;
