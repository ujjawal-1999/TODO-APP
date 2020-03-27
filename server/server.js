const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo',{
// 	text:{
// 		type:String,
// 		required : true,
// 		minlength:1,
// 		trim:true
// 	},
// 	completed:{
// 		type:Boolean,
// 		default:false
// 	},
// 	completedAt:{
// 		type:Number,
// 		default:null
// 	}
// });
// var User = mongoose.model('User',{
// 	email:{
// 		type:String,
// 		required:true,
// 		minlength:1,
// 		trim:true
// 	}
// });

// var newTodo = new Todo({
// 	text:'Cook Dinner',
// });
// newTodo.save().then((doc)=>console.log(doc)).catch((err)=>console.log(err));

// var newUser = new User({
// 	email:'jainujjawal1999@gmail.com'
// });
// newUser.save().then((res)=>{
// 	console.log(res);
// }).catch((err)=>{
// 	console.log(err);
// });
var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text:req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
		console.log(doc);
	}).catch((err)=>{
		res.status(400).send(err);
	});
});

app.get('/todos',(req,res)=>{
	Todo.find({}).then((todos)=>{
		res.send({todos});
	}).catch((err)=>res.status(400).send(err));
});

app.post('/users',(req,res)=>{
	var user = new User({
		email:req.body.email
	});
	user.save().then((doc)=>{
		res.send(doc);
		console.log(doc);
	}).catch((err)=>{
		console.log(err);
		res.send(err);
	});
});
app.listen(3000,()=>{
	console.log('Server up and running on port 3000');
});

module.exports = {app};