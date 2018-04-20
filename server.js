const express = require('express');
const app = express();

app.use(express.static('static_files/'));

const fakeDatabase = {
'La Jolla' :{location:'Villas of Renaissance',
location2:'La Regencia'},

'OceanSide' :{location:'Villas of RenaissanceXXX',
location2: 'La RengenciaXXX'}

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



/**const fakeDatabase = {
	'Lo Jolla': [ {
		"Villas of Renaissance" : {price:'$ 2800-3400/mon',crimeRate: 'low', earthquake:'medium risk' },
		"La Regencia" : {price:'$ 2700-3200/mon',crimeRate: 'medium', earthquake:'medium risk' }

	}
],	

	'OceanSide': [ {
		"Villas of XXXX" : {price:'$ 2800-3400/mon',crimeRate: 'low', earthquake:'medium risk' },
		"La RegenciaXXXXX" : {price:'$ 2700-3200/mon',crimeRate: 'medium', earthquake:'medium risk' }

	}
],	

};**/