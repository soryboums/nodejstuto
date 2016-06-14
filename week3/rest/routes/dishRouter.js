var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get(function(req, res, next){
    Dishes.find({}, function(err, dishes){
        if (err) throw err;
        res.json(dishes);
    });
})

.post(function(req, res, next){
    console.log(req.body);
    // res.end('Will add the dish: '+ req.body.name+' with details: '+req.body.description);
    Dishes.create(req.body, function(err, dish){
        if (err) throw err;
        var id = dish._id;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Added the dish with id: '+ id);
    });
})

.delete(function(req, res, next){
    // res.end('Will Delete all dishes');
    Dishes.remove({}, function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
})

dishRouter.route('/:dishId')

.get(function(req, res, next){
    // res.end('Will send details of the dish: '+req.params.dishId+' to you!');
    Dishes.findById(req.body.dishId, function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req, res, next){
    // res.write('Updating the dish: '+req.params.dishId+'\n');
    // res.end('Will update the dish: '+req.body.name+' with details: '+req.body.description);
    Dishes.findByIdAndUpdate(req.body.dishId, {
        $set: req.body
    }, {
        new: true
    }, function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req, res, next){
    // res.end('Deleting dish: '+req.params.dishId);
    Dishes.findByIdAndRemove(req.body.dishId, function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = dishRouter;
