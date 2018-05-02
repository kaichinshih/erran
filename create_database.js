// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm pets.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('houses.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users_to_houses ( estate TXT, price TEXT, house TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO users_to_houses VALUES ('Villas of Renaissance', '$ 2800-3400/mon', 'LaJolla.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('La Regencia', '$ 2700-3200/mon', 'LaJolla.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('Villas of XXXX', '2800-3400/mon', 'OceanSide.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('La RegenciaXXX', '2700-3200/mon', 'OceanSide.jpg')");

  console.log('successfully created the users_to_houses table in houses.db');

  // print them out to confirm their contents:
  db.each("SELECT estate, price, house FROM users_to_houses", (err, row) => {
      console.log( row.estate +": " + row.price +' - ' + row.house);
  });
});

db.close();