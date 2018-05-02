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
  db.run("CREATE TABLE users_to_houses ( estate TXT, price TEXT, rating TEXT, risks TEXT, house TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO users_to_houses VALUES ('Villas of Renaissance', '$ 1855-3800/mon', '3.5 Stars', '0.51-1.60 (High)', 'VoR.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('La Regencia', '$ 2000-3600/mon', '2.5 Stars', '0.51-1.60 (High)', 'LR.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('Regents Court', '$ 1900-3800/mon', '2.5 Stars', '0.51-1.60 (High)', 'RC.jpg')");
  db.run("INSERT INTO users_to_houses VALUES ('Solazzo', '$ 2000-4000/mon', '2 Stars', '0.51-1.60 (High)', 'Solazzo.jpg')");

  console.log('successfully created the users_to_houses table in houses.db');

  // print them out to confirm their contents:
  db.each("SELECT estate, price, rating, risks, house FROM users_to_houses", (err, row) => {
      console.log( row.estate +": " + row.price +' - ' + row.rating +' - ' + row.risks +' - ' + row.house);
  });
});

db.close();