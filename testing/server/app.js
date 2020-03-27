const express = require('express');
const server = express();

server.get('/',(req,res)=>{
	res.status(200).send({
		error:'This is an error',
		name:'This is a Todo App'
	});
});

server.get('/pp',(req,res)=>{
	res.status(200).send([{
		name :'Ujjawal',
		age:20
		},{
			name:'Raj',
			age : 23
		},
		{
			name:'Rohan',
			age :32
		}
		]);
});

server.listen(3000,()=> console.log('Server up and running on port 3000'));

module.exports.server = server;