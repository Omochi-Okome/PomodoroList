const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect(
        process.env.MONGO_URL
    )
    .then(client =>{
        console.log('Connected!');
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;