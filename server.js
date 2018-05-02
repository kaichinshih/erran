const express = require('express');
const app = express();

app.use(express.static('static_files/'));


const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('houses.db');

/**const fakeDatabase = {
'La Jolla' :{location:'Villas of Renaissance',
location2:'La Regencia'},

'OceanSide' :{SecondLocation:'Villas of RenaissanceXXX',
SecondLocation2: 'La RengenciaXXX'}

};**/



app.get('/users', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT estate FROM users_to_houses', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.estate);
    console.log(allUsernames);
    res.send(allUsernames);
  });
});






const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app
app.post('/users', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO users_to_houses VALUES ($estate, $price, $rating, $risks, $house)',
    // parameters to SQL query:
    {
      $estate: req.body.estate,
      $price: req.body.price,
      $rating: req.body.rating,
      $risks: req.body.risks,
      $house: req.body.house,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );
});







app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(
    'SELECT * FROM users_to_houses WHERE estate=$estate',
    // parameters to SQL query:
    {
      $estate: nameToLookup
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    }
  );
});







/**app.get('/users/:userid/:residential', (req, res) => {
  const nameToLookup2 = req.params.residential; // matches ':userid' above

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(
    'SELECT * FROM users_to_houses WHERE estate=$estate',
    // parameters to SQL query:
    {
      $estate: nameToLookup
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    }
  );
});**/








app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});


/**const fakeDatabase = {
	'Lo Jolla': {
		"Villas of Renaissance" : {price:'$ 2800-3400/mon',crimeRate: 'low', earthquake:'medium risk' },
		"La Regencia" : {price:'$ 2700-3200/mon',crimeRate: 'medium', earthquake:'medium risk' }

	}
,	

	'OceanSide':  {
		"Villas of XXXX" : {price:'$ 2800-3400/mon',crimeRate: 'low', earthquake:'medium risk' },
		"La RegenciaXXXXX" : {price:'$ 2700-3200/mon',crimeRate: 'medium', earthquake:'medium risk' }

	}	

};**/






	/**const nameToLookup = req.params.userid;
	const val = Object.keys(fakeDatabase[nameToLookup]).length;
	console.log(val);
	console.log(val > 0);
	if (val){
		res.send(Object.keys(fakeDatabase[nameToLookup]));
	} else {
		res.send({}); //empty object
	}**/