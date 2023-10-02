var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js')

app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
  //else create user
  dal.create(req.params.name, req.params.email, req.params.password).
    then((user) => {
      console.log(user)
      res.send(user);
    })
  });

//account deposit
app.get('/account/deposit/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  });
});
//account withdrawal
app.get('/account/withdraw/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  });
});
//account balance
app.get('/account/balance/:email/:balance', function (req, res) {
  res.send({
    email: req.params.email,
    balance: req.params.balance
  });
});
//all accounts
app.get('/account/all', function (req, res) {
  dal.all(). 
    then((docs) => {
      console.log(docs)
      res.send(docs);
    })
  });

app.listen(3000);
console.log('Running on port 3000!');
