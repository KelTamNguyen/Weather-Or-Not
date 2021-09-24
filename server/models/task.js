const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
	.then(() => {    
		console.log('connected to MongoDB');
	})  
	.catch((error) => {    
		console.log('error connecting to MongoDB:', error.message);
	});

const taskSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true,
		unique: true
	},
	completed: {
		type: Boolean, 
		default: false
	},
	date: Date
});

mongoose.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('task', taskSchema);