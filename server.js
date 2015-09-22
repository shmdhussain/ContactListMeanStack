var express=require("express");
var app=express();
var mongojs=require("mongojs");
var db=mongojs('contactlist',['contactlist']);
var bodyparser=require("body-parser");
// app.get('/',function(req,res){
// 	res.send("hello from server.js")
// });


app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.get('/contactlist',function(req,res){
	console.log("I received a GET request");
	// person1={
	// 	name: 'john',
	// 	email:'john@ff.cc',
	// 	number: '1234567890'
	// };
	// person2={
	// 	name: 'doe',
	// 	email:'doe@ff.cc',
	// 	number: '44444444444'
	// };
	// person3={
	// 	name: 'jack',
	// 	email:'jack@ff.cc',
	// 	number: '2345678901'
	// };
	// var contactlist=[person1,person2,person3];

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);

	});
	// setTimeout(function(){
	// 	res.json(contactlist);
	// },12000);
	//res.json(contactlist);
	
});

app.post('/contactlist',function(req,res){

	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){

		res.json(doc);
	});

});

app.delete('/contactlist/:id', function(req,res){

	var id =req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){

		res.json(doc);

	})
});

app.get('/contactlist/:id',function(req,res){
	var id =req.params.id;
	console.log(id);
	console.log("i received a GET request");
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err, doc){
		console.log(doc);
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id =req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id:mongojs.ObjectId(id)},update: {$set:{name:req.body.name,email:req.body.email,number:req.body.number}},new:true},function(err, doc){
		console.log(doc);
		res.json(doc);
	});
});
app.listen(3000);
console.log("server running in 3000");




