var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

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
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description:'Test dish',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            },
            {
              "rating": 4,
              "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
              "author": "Paul McVites"
            }
        ]
    }, function(err, dish){
        if (err) throw err;
        console.log('Dish created');
        console.log(dish);
        console.log(dish.description);
        console.log(dish.label);
        var id = dish._id;
        setTimeout(function(){
            Dishes.findByIdAndUpdate(id, {
                $set:{
                    description: 'Updated test',
                    label: 'Updated label'
                }
            }, {new: true}).exec(function(err, dish){
                console.log('Updated dish');
                console.log(dish);
                console.log(dish.description);
                console.log(dish.label);
                // console.log(dish.comments[0].comment);
                console.log(dish.comments);
                dish.comments.push({
                    rating: 5,
                    comment: 'Amazinnnnggg',
                    author: 'Leo Di Caprio'
                });

                dish.save(function(err, dish){
                    console.log('Updated comments');
                    // console.log(dish.comments[0].comment);
                    db.collection('dishes').drop(function(){
                        db.close();
                    });
                });
                

            });
        },3000);
    });
});
