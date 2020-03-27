const expect =require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos =[{
	_id : new ObjectID(),
	text:"First Todo"
},{
	_id : new ObjectID(),
	text:"Second Todo"
}];

beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);
	}).then(()=>done());
});

describe('POST /todos',()=>{
	it('should add a todo',(done)=>{
	var text = 'jainujjawal1999';
	request(app)
	.post('/todos')
	.send({text})
	.expect(200)
	.expect((res)=>{
		expect(res.body.text).toBe(text);
	})
	.end((err,res)=>{
		if(err)
			return done(err);
		Todo.find({text}).then((todos)=>{
			expect(todos.length).toBe(1);
			expect(todos[0].text).toBe(text);
			done();
		}).catch((err)=>done(err));
	});
});

	it('should not add a todo',(done)=>{
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res)=>{
			if(err)
				return done(err);
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(2);
				done();
			}).catch((err)=>done(err));
		});
	});
});

describe('GET /todos',()=>{
	it('should get all todos',(done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

describe('GET /todos/:id',()=>{
	it('should return todo with the id',(done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe(todos[0].text);
		})
		.end(done);
	});
	it('should return a 400 if id not found',(done)=>{
		var hexid = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexid}`)
		.expect(400)
		.end(done);
	});
	it('should return a 404 for non-object ids',(done)=>{
		request(app)
		.get('/todos/123abs')
		.expect(404)
		.end(done);
	});
});