const {User} = require('./../models/user');

var authenticate = (req,res,next)=>{
		var token = req.header('Authorization');
		User.findByToken(token).then(()=>{
		if(!user){
			// res.status(401).send();
			return Promise.reject();
			// throw new Error();
		}
			req.user = user;
			req.token = token;
			next();
		}).catch((err)=>{
		res.status(401).send('Unable to fetch token');
	});
};


module.exports = {authenticate};