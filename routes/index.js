var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

router.get('/newuser', function(req, res){
	res.render('newuser', {title: 'Add New User'});
});

router.post('/adduser', function(req,res){
	//set an internal db variable
	var db = req.db;
	//get form values
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	// set our collection
	var collection = db.get('usercollection');

	//submit to db
	collection.insert({
		"username": userName,
		"email": userEmail}, function(err, doc){
			if (err) {
				res.send("There was aproblem adding information to the database.");
			}
			else{
				res.redirect("userlist");
			}
		});
});
module.exports = router;
