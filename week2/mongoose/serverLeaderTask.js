var mongoose = require('mongoose'),
    assert = require('assert');

var Learders = require('./models/leadership');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// open error is fired when the connection is opened
// db.once will catch the event only one time
db.once('open', function(){
    console.log("Connected correctly to the server");
    lead = {
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    },

    Learders.create(lead, function(err, leader){
        if (err) throw err;
        console.log('Promo created');
        console.log(leader);
        console.log(leader.description);
        var id = leader._id;
        setTimeout(function(){
            Learders.findByIdAndUpdate(id, {
                $set:{
                    description: 'Updated leader Test'
                }
            }, {new: true}).exec(function(err, leader){
                console.log('Updated leader');
                console.log(leader);
                console.log(leader.description);
                db.collection('leaderships').drop(function(){
                    db.close();
                });
            });
        },3000);
    });
});
