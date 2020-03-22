const {MongoClient,ObjectID} = require('mongodb');

const obj = new ObjectID();
console.log(obj);

const dbName = 'TodoApp';
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
	useUnifiedTopology : true
	if(err){
		return console.log('Unable to connect to the database');
	}
	console.log('Connected to MongoDB server');
	const db = client.db(dbName);
	db.collection('Todos').insertOne({
			text : 'Something to do',
			completed : false
	},(err,result)=>{
		if(err){
			return console.log('Unable to insert data');
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});
	db.collection('Users').insertOne({
		name : 'Ujjawal',
		age : 20,
		location : 'Tinsukia,Assam'
	},(err,result)=>{
		if(err)
			return console.log('Unable to insert data');
		console.log(JSON.stringify(result.ops,undefined,2));
		console.log(result.ops[0]._id.getTimestamp());
	});

	client.close();
});