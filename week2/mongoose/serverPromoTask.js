var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotion');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// open error is fired when the connection is opened
// db.once will catch the event only one time
db.once('open', function(){
    console.log("Connected correctly to the server");
    promot = {
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    };

    Promotions.create(promot, function(err, promo){
        if (err) throw err;
        console.log('Promo created');
        console.log(promo);
        console.log(promo.description);
        var id = promo._id;
        setTimeout(function(){
            Promotions.findByIdAndUpdate(id, {
                $set:{
                    description: 'Updated promo test'
                }
            }, {new: true}).exec(function(err, promo){
                console.log('Updated promo');
                console.log(promo);
                console.log(promo.description);
                console.log(promo.price);
                db.collection('promotions').drop(function(){
                    db.close();
                });
            });
        },3000);
    });
});
