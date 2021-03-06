var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// open error is fired when the connection is opened
// db.once will catch the event only one time
db.once('open', function(){
    console.log("Connected correctly to the server");

    var newDish = Dishes({
        name: 'uthapizza',
        description: 'test'
    });

    newDish.save(function(err){
        if (err) throw err;
        console.log("Dish created");

        Dishes.find({}, function(err, dishes){
            if (err) throw err;
            console.log(dishes);
            db.collection('dishes').drop(function(){
                db.close();
            });
        });
    });
});
