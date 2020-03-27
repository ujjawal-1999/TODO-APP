const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var userid = '5e7760802f944c465436040d';
var id = '5e7dc54203a9a17f8c19070';

if(!ObjectID.isValid(userid)){
	console.log('Id is not valid');
}
// Todo.find({_id:id}).then((res)=>{
// 	console.log(res);
// }).catch((err)=>{
// 	console.log(err);
// });
// Todo.findOne({_id:id}).then((res)=>{
// 	console.log(res);
// }).catch((err)=>{
// 	console.log(err);
// });

User.findById(userid).then((todo)=>{
	if(!todo){
		return console.log('Unable to find id');
	}
	console.log(todo);
});