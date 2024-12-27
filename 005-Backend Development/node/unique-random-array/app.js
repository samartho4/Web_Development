const uniqueRandomArray = require('./index');

const items = ['apple','cherry','banana','date'];

const randomItem = uniqueRandomArray(items);

console.log("Random Item:");

console.log(randomItem());
console.log(randomItem());
console.log(randomItem());
