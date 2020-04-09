// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// var password = '123abc';

// bcrypt.genSalt(10,(err,salt)=>{
// 	bcrypt.hash(password,salt,(err,hash)=>{
// 		console.log(hash);
// 	});
// });

// var hashedPassword = '$2a$10$2nXcKyTclcoIj7ssGYrVleCHSdnSQQDsPfg6YfiCK9N3zCYq3cbkm';
// bcrypt.compare('password',hashedPassword,(err,res)=>{
// 	console.log(res);
// })




// var data = {id : 10};
// var token = jwt.sign(data,'123abs');
// console.log(token);

// var decode = jwt.verify(token,'123abs');
// console.log(decode);

// var dec = jwt.decode(token);
// console.log(dec);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`message:${message}`);
// console.log(`hash:${hash}`);

// var data ={
// 	id : 4
// } 

// var token = {
// 	data,
// 	hash:SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash){
// 	console.log('No change');
// }
// else
// 	console.log('Do not trust data');
const bcrypt = require('bcryptjs');

var password = 'Ujjawal@1999';
bcrypt.genSalt(10,(err,salt)=>{
	bcrypt.hash(password,salt,(err,hash)=>{
		console.log(hash);
	});
});

bcrypt.compare(password,'$2a$10$4/4GTpPAtY2/sphUHX/T1OKVtP2vpvrNmdpIwZB4mJvfcT8hTqesK',(err,res)=>{
	console.log(res);
});