'use strict';
const uniqueRandomArray = require('unique-random-array');
const superheroes = require('./superheroes.json');

exports.all = superheroes;
exports.random = uniqueRandomArray(superheroes);

// Test the module
console.log("Superheroes JSON:", superheroes);
console.log("Random Hero:", exports.random());
