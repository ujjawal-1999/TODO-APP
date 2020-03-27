const expect =require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App',()=>{
	var db = {
		saveUser: expect.createSpy()
	};
	app.__set__('db',db);
	it('should call the spy correctly',()=>{
		var spy = expect.createSpy();
		spy('Andrew');
		expect(spy).toHaveBeenCalledWith('Andrew');
	});
	it('should call the spy with rewire',()=>{
		var email = 'jainujjawal1999';
		var password = 'ujjawal@1999';
		app.handleSignup(email,password);
		expect(db.saveUser).toHaveBeenCalledWith({email,password});
	});
});