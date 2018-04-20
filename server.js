const express = require('express');
const app = express();

app.use(express.static('static_files/'));

const fakeDatabase = {
	'Philip': {job:'professor', pet: 'cat.jpg'},
	'John': {job:'student', pet: 'dog.jpg'},
	'Carol': {job:'engineer', pet: 'bear.jpg'},
};

app.get('/users', (req, res) => {
	console.log('running app.get /users');
	res.send(Object.keys(fakeDatabase));
});

app.get('/users/:userid', (req, res) => {
	const nameToLookup = req.params.userid;
	const val = fakeDatabase[nameToLookup];
	if (val){
		res.send(val);
	} else {
		res.send({}); //empty object
	}
});

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000/');
});