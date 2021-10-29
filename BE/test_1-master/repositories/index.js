const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb+srv://dvn:dvn@social.2xva5.mongodb.net/social?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connect mongodb successful');
    })

db.on('error', err => {
    console.log(err.message);
})

module.exports = mongoose;