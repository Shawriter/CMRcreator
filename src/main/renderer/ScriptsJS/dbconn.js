const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'NamesAddresses.db');


// Initialize and export the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    country TEXT NOT NULL,
    reference TEXT,
    phone_number TEXT,
    email TEXT NOT NULL UNIQUE
  )`);
  console.log('Customers table ensured');
});


module.exports = db;