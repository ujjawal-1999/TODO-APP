const request = require('supertest');
const expect = require('expect');
const server = require('./app').server;

describe('server',()=>{
	
it('should get the http request',(done)=>{
	request(server)
	.get('/')
	.expect(200)
	.expect((res)=>{
		expect(res.body).toInclude({
			name:'This is a Todo App'
		});
	})
	.end(done);
});

it('should return an object',(done)=>{
	request(server)
	.get('/pp')
	.expect(200)
	.expect((res)=>{
		expect(res.body).toInclude({
			name:'Ujjawal',
			age:20
		})
	})
	.end(done);
});
});
