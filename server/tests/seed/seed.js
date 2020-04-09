const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const UserOneId = new ObjectID();
const UserTwoId = new ObjectID();
const users = [{
	_id: UserOneId,
	email:"jainujjawal1999@gmail.com",
	password:"User@123",
	tokens:[{
		access : 'auth',
		token : jwt.sign({_id:UserOneId,access:'auth'},'abc123').toString()
	}
	]
},{
	_id : UserTwoId,
	email:"ujjawal.nits@gmail.com",
	password:"Ujjawal@132"
}];

const populateUsers = (done)=>{
	User.remove().then(()=>{
		var UserOne = new User(users[0]).save();
		var UserTwo = new User(users[1]).save();
		return Promise.all([UserOne,UserTwo]);
	}).then(()=>done());
};

const todos = [
	{
		_id : new ObjectID(),
		text: "First Todo"
	},{
		_id : new ObjectID(),
		text:"Second Todo",
		completed:true,
		completedAt:15625
	}
];

const populateTodos = (done)=>{
	Todo.remove().then(()=>{
		return Todo.insertMany(todos);
	}).then(()=>done());
};
module.exports = {todos,populateTodos,users,populateUsers};