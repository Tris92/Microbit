var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }
 mongoose.connect('mongodb+srv://Tris92:852MicrobitBackend@microbitbackend.qeqru9t.mongodb.net/?retryWrites=true&w=majority',
    options,        
    function(err) {
     console.log(err);
    }
 );

 var userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  userName: String,
  schoolName: String, 
  email: String,
  ageGroup: String 
});

var UserModel = mongoose.model('users', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
