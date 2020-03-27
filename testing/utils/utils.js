module.exports.add = (a,b)=>{
	return a+b;
};
module.exports.multiply = (a,b)=>{
	return a*b;
};

module.exports.asyncAdd = (a,b,callback)=>{
	setTimeout(()=>{
		callback(a+b);
	},1000);
}
module.exports.setName =(user,fullName)=> {
	var names = fullName.split(' ');
	user.firstName = names[0];
	user.lastName = names[1];
	return user;
};
// module.exports = {
// 	add,
// 	multiply
// };
