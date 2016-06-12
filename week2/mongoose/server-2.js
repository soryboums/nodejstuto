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
    Dishes.create({
        name:'newDish',
        description:'Test dish'
    }, function(err, dish){
        if (err) throw err;
        console.log('Dish created');
        console.log(dish);
        console.log(dish.description);
        var id = dish._id;
        setTimeout(function(){
            Dishes.findByIdAndUpdate(id, {
                $set:{
                    description: 'Updated test'
                }
            }, {new: true}).exec(function(err, dish){
                console.log('Updated dish');
                console.log(dish);
                console.log(dish.description);
                db.collection('dishes').drop(function(){
                    db.close();
                });

            });
        },3000);
    });
});
