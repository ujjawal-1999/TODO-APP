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
	text:"Second Todo",
	completed:true,
	completedAt:15625
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
		.get(`/todos/${todos[1]._id.toHexString()}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(todos[1].text);
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

describe('DELETE /todos/:id',(req,res)=>{
	it('should delete a todo',(done)=>{
		var hexid = todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${hexid}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(hexid);
		})
		.end((err,res)=>{
			if(err)
				return done(err);
			Todo.findOne({_id:hexid}).then((todo)=>{
				expect((r)=>{
					expect(r.body.todo).toNotExist();
				});
				done();
			}).catch((err)=>done(err));
		});
	});
	// it('should return a 404 if todo is not found',(done)=>{
	// 	var hexid = new ObjectID().toHexString();
	// 	request(app)
	// 	.delete(`/todos/${hexid}`)
	// 	.expect(404)
	// 	.end(done);
	// });
	// it('should return a 404 if id is invalid',(done)=>{
	// 	request(app)
	// 	.delete(`/todos/123acb`)
	// 	.expect(404)
	// 	.end(done);
	// });
});

describe('PATCH /todos/:id',()=>{
	it('should update the todo',(done)=>{
		var id = todos[0]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({text:'Updated text',completed:true})
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe('Updated text');
			expect(res.body.completed).toBe(true);
			expect((r)=>{
				expect(r.body.completedAt).toBeA('number');
			});
		})
		.end(done);
	});
	it('should clear completedAt when todo not completed',(done)=>{
		var id = todos[0]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({text:'Updated text!!!',completed:false})
		.expect(200)
		.expect((res)=>{
			expect(res.body.text).toBe('Updated text!!!');
			expect(res.body.completed).toBe(false);
			expect((r)=>{
				expect(r.body.completedAt).toNotExist();
			});
		})
		.end(done);
	});


})