
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hasher() {
    
    
    const password = 'your_password';
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    });
}   


function compareHash() {

    const bcrypt = require('bcrypt');

    const password = 'your_password';
    const hash = 'hashed_password_from_db';
    
    bcrypt.compare(password, hash, function(err, result) {
      // result is true if the passwords match, false otherwise
    });
}

module.exports = hasher, compareHash;