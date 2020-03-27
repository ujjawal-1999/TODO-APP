const expect =require('expect');
const utils = require('./utils');

describe('Utils',()=>{
	describe('#add',()=>{
			it('should add two numbers',()=>{
	var res = utils.add(10,15);
	expect(res).toBeA('number').toBe(25);
});
it('should asynchronously add',(done)=>{
	var res = utils.asyncAdd(10,10,(sum)=>{
		expect(sum).toBe(20);
		done();
	});
});
	});
it('should multiply two numbers',()=>{
	var res = utils.multiply(10,10);
	expect(res).toBeA('number').toBe(100);
});

it('should set name',()=>{
	var user = {age:30};
	var res = utils.setName(user,'Nishi sekhani');
	expect(user).toEqual(res);
});
});
