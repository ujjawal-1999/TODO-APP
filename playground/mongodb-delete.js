const {MongoClient,ObjectID} = require('mongodb');
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
	if(err)
		return console.log('Unable to connect to Mongodb server');
	console.log('Connected to the Mongodb server');
	const db = client.db(dbName);
	// db.collection('Todos').deleteMany({text : 'Nothing to do'}).then((result)=>{
	// 	console.log(result);
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	// db.collection('Todos').deleteOne({text : 'Nothing to do'}).then((result)=>{
	// 	console.log(result);
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	db.collection('Todos').findOneAndDelete({completed : 'Adverse Affect'}).then((result)=>{
		console.log(result);
	}).catch((err)=>{
		console.log(err);
	});
	client.close();
});