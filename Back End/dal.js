const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log('connected to Mongo DB server!');

  //connect to myprojet db
  db = client.db('myproject');
});

//create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1}, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}
//all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection('users')
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs)
      });
  });
}

module.exports = {create, all};