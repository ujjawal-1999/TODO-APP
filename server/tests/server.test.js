const expect =require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed')

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('TODOS',()=>{
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
});
});

describe('Users',()=>{
	describe('POST /users',()=>{
		it('should add a user',(done)=>{
			var email = "pal@123.com";
			var password = "123mnbnjdcxkn";
			request(app)
			.post('/users')
			.send({email,password})
			.expect(200)
			.expect((res)=>{
				expect((r)=>{
					expect(r.body._id).toExist();
					expect(r.headers.Authorization).toExist();
				});
				expect(res.body.email).toBe(email);
			})
			.end((err,res)=>{
				if(err)
					return done(err);
				User.findOne({email}).then((user)=>{
					expect((r)=>{
						expect(r.user).toExist();
					expect(r.user.password).toNotBe(password);
					})
					done();
				}).catch((err)=>done(err));
			});
		});
		it('should return validation error if the request fails',(done)=>{
			var email = 'ujjawal';
			var password = 'hih';
			request(app)
			.post('/users')
			.send({email,password})
			.expect(400)
			.expect((res)=>{
				expect((r)=>{
					expect(r.body._id).toNotExist();
					expect(r.headers.Authorization).toNotExist();
				});
			})
			.end(done);
			});
		it('should not create user if email in use',(done)=>{
			var email = 'ujjawal.nits@gmail.com';
			var password = "Ujjawal@1999";
			request(app)
			.post('/users')
			.send({email,password})
			.expect(400)
			.expect((res)=>{
				expect((r)=>{
					expect(r.body._id).toNotExist();
					expect(r.headers.Authorization).toNotExist();
				});
			})
			.end(done);
		});
		});
	describe('GET /users',()=>{
		it('should get all the users',(done)=>{
			request(app)
			.get('/users')
			.expect(200)
			.expect((res)=>{
				expect(res.body.users.length).toBe(2);
			})
			.end(done);
		});
	});
	describe('GET /users/id',()=>{
		it('should get a user',(done)=>{
			var hexid = users[0]._id.toHexString();
			request(app)
			.get(`/users/${hexid}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
		});
		it('should return a 400 if id not found',(done)=>{
			var hexid = new ObjectID().toHexString();
			request(app)
			.get(`/users/${hexid}`)
			.expect(400)
			.end(done);
		});
		it('should return a 404 for non-object id',(done)=>{
			request(app)
			.get(`/users/123bhsb`)
			.expect(404)
			.end(done);
		});
	});
	describe('PATCH /users/:id',()=>{
	it('should update the user',(done)=>{
		var id = users[0]._id.toHexString();
		request(app)
		.patch(`/users/${id}`)
		.send({email:'Updated text'})
		.expect(200)
		.expect((res)=>{
			expect(res.body.email).toBe('Updated text');
		})
		.end(done);
	});
});
	describe('POST /users/login',()=>{
		it('should login user and return auth token',(done)=>{
			request(app)
			.post('/users/login')
			.send({email:users[1].email,password:users[1].password})
			.expect(200)
			.expect((res)=>{
				expect((res)=>{
					expect(res.headers.Authorization).toExist();
				});
			})
			.end((err,res)=>{
				if(err)
					return done(err);
				User.findOne({_id:users[1]._id}).then((user)=>{
					expect((r)=>{
						expect(r.user.tokens[0]).toInclude({
							access:'auth',
							token:r.headers.Authorization
						});
					});
					done();
				}).catch((err)=>done(err));
			});
		});
		it('should reject invalid login',(done)=>{
			request(app)
			.post('/users/login')
			.send({email:users[1].email,password:"Ujjawaljain"})
			.expect(400)
			.expect((res)=>{
				expect((r)=>{
					expect(r.headers.Authorization).toNotExist();
				});
			})
			.end((err,res)=>{
				if(err)
					return done(err);
				User.findOne({_id:users[1]._id}).then((user)=>{
					expect((r)=>{
						expect(r.user.tokens[0]).toNotInclude({
							access:'auth',
							token:r.headers.Authorization
						});
					});
					done();
				}).catch((err)=>done(err));
			});
		});
	});
});