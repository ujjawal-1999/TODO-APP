const {MongoClient,ObjectID} = require('mongodb');

const dbName = 'TodoApp';
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
	useUnifiedTopology : true
	if(err){
		return console.log('Unable to connect to the database');
	}
	console.log('Connected to MongoDB server');
	const db = client.db(dbName);
	// db.collection('Todos').find({_id : new ObjectID('5e770073c2da5806989ff06f')}).toArray().then((docs)=>{
	// 	console.log(JSON.stringify(docs,undefined,2));
	// }).catch((err)=>{
	// 	console.log('Unable to fetch todos',err);
	// });
	// 	db.collection('Todos').find().count().then((docs)=>{
	// 	console.log(docs);
	// }).catch((err)=>{
	// 	console.log('Unable to fetch todos',err);
	// });
	db.collection('Users').find({name: 'Nishi'}).toArray().then((users)=>{
		console.log(JSON.stringify(users,undefined,3));
	}).catch((err)=>{
		console.log(err);
	});
	client.close();
});