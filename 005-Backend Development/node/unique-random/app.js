const uniqueRandom = require('./index');

// Create a random number generator
const random = uniqueRandom(1, 10);

// Generate random numbers
console.log(random());
console.log(random());
console.log(random());
