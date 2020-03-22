const {MongoClient,ObjectID} = require('mongodb');
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
	if(err)
		return console.log('Unable to connect to Mongo Server');
	console.log('Connected to the Mongo Server');
	const db = client.db(dbName);
	// db.collection('Todos').findOneAndUpdate({
	// 	_id:new ObjectID("5e771846cc155a3659b69835")
	// },{
	// 	$set:{
	// 		completed:true
	// 	}
	// },{
	// 	returnOriginal : false
	// }).then((result)=>{
	// 	console.log(JSON.stringify(result,undefined,2));
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	db.collection('Users').findOneAndUpdate({
		_id : ObjectID("5e770651b7d84e148cd81e17")
	},{
		$inc:{
			age : 3
		},
		$set:{
			name : 'Nishi'
		}
	},{
		returnOriginal:false
	}).then((result)=>{console.log(JSON.stringify(result,undefined,2));
	}).catch((err)=>{
		console.log(err);
	});
	client.close();
});