require('./config/config');
const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const port = process.env.PORT;

var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var body = _.pick(req.body,["text","completed","completedAt"]);
	var todo = new Todo(body);
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

app.get('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findById(id).then((todo)=>{
		if(!todo.length)
			res.status(200).send({todo});
		else
			res.status(404).send();
	}).catch((err)=>{
		res.status(400).send('Not found');
	});
});

app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404);
	Todo.findOneAndRemove({_id:id}).then((todo)=>{
		if(!todo)
			res.status(404);
		else
			res.send({todo});
	}).catch((err)=>{
		res.send(400);
	});
});

app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body,["text","completed"]);
	if(!ObjectID.isValid(id))
		return res.status(404).send();
	if(_.isBoolean(body.completed) && body.completed){
		body.completed = true;
		body.completedAt = new Date().getTime();
	}
	else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({_id:id},{$set:body},{new : true}).then((todo)=>{
		if(!todo)
			return res.status(404).send();
		res.status(200).send(todo);
	}).catch((err)=>{
		res.status(400).send();
	});
});

app.post('/users',(req,res)=>{
	var body = _.pick(req.body,["email","password"]);
	var user = new User(body);
	user.save().then(()=>{
		return user.generateAuthToken();
	}).then((token)=>{
		res.header('Authorization',token).send(user);
	}).catch((err)=>{
		res.status(400).send(err);
	});
});

app.get('/users',(req,res)=>{
	User.find().then((users)=>{
		res.status(200).send({users});
	}).catch((err)=>res.status(404).send(err));
});

app.get('/users/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	User.findById(id).then((user)=>{
		if(!user.length)
			res.status(200).send(user);
		else
			res.status(404).send();
	}).catch((err)=>{
		res.status(400).send();
	});
});

app.delete('/users/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send();
	User.findOneAndRemove({_id:id}).then((user)=>{
		if(!user)
			res.status(404);
		else
			res.status(200).send({user});
	}).catch((err)=>res.status(400));
});

app.patch('/users/:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body,["email"]);
	if(!ObjectID.isValid(id))
		return res.status(404);
	User.findOneAndUpdate({_id:id},{$set:body},{new:true}).then((user)=>{
		if(!user)
			return res.status(404).send();
		res.status(200).send(user);
	}).catch((err)=>res.status(400));
});

app.post('/users/login',(req,res)=>{
	var body = _.pick(req.body,["email","password"]);
	User.findByCredentials(body.email,body.password).then((user)=>{
		return user.generateAuthToken().then((token)=>{
			res.header('Authorization',token).send(user);
		});
	}).catch((err)=>{
		res.status(400).send('Unable to find user');
	});
});

// app.get('/users/me',authenticate,async(req,res)=>{
// 	res.send(req.user);
// 	console.log(req.body)
// });

app.listen(port,()=>{
	console.log(`Server up and running on port ${port}`);
});
 
module.exports = {app};