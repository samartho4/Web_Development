// Object to provide lookup of morse code for a given letter
let alpha = {
    'A': '.-',    'B': '-...', 'C': '-.-.', 'D': '-..', 
    'E': '.',     'F': '..-.', 'G': '--.',  'H': '....',
    'I': '..',    'J': '.---', 'K': '-.-',  'L': '.-..', 
    'M': '--',    'N': '-.',   'O': '---',  'P': '.--.',
    'Q': '--.-',  'R': '.-.',  'S': '...',  'T': '-',
    'U': '..-',   'V': '...-', 'W': '.--',  'X': '-..-',
    'Y': '-.--',  'Z': '--..'
};

// Object to provide lookup of letter for a given morse code
let morse = {};
// Populate morse lookup by inverting the alpha object
for (let letter in alpha) {
    morse[alpha[letter]] = letter;
}

// Return true if all characters are morse code
function isMorse(characters) {
    // Match dots, dashes, spaces, and forward slashes only
    let morseRegex = /^[.-\s/]+$/;
    return morseRegex.test(characters);
}

// Return true if all characters are part of the alphabet defined in alpha
function isAlpha(characters) {
    // Convert input to uppercase and create regex from alpha keys
    characters = characters.toUpperCase();
    let alphaChars = Object.keys(alpha).join('') + ' ';
    let alphaRegex = new RegExp(`^[${alphaChars}]+$`);
    return alphaRegex.test(characters);
}

// Convert alpha text to morse code
function textToMorse(text) {
    if (!isAlpha(text)) return undefined;
    
    // Convert to uppercase and split into characters
    text = text.toUpperCase();
    return text.split('').map(char => {
        if (char === ' ') return '/';
        return alpha[char];
    }).join(' ');
}

// Convert morse code to alpha text
function morseToText(morseCode) {
    if (!isMorse(morseCode)) return undefined;
    
    // Split into words (separated by /) then into individual morse characters
    return morseCode.split('/').map(word => {
        return word.trim().split(' ').map(code => {
            return morse[code];
        }).join('');
    }).join(' ');
}

// Message class to handle both morse and alpha representations
class Message {
    constructor(text) {
        // Determine if input is morse or alpha and store accordingly
        if (isMorse(text)) {
            this.morse = text;
            this.alpha = morseToText(text);
        } else if (isAlpha(text)) {
            this.alpha = text.toUpperCase();
            this.morse = textToMorse(text);
        } else {
            throw new Error('Invalid input: must be either morse code or alphabetic text');
        }
    }

    toMorse() {
        return this.morse;
    }

    toAlpha() {
        return this.alpha;
    }
}

// Test the implementation
let msg1 = new Message('--- -... .--- . -.-. - .../.. -./.--- .- ...- .- ... -.-. .-. .. .--. -/.- .-. ./...- . .-. -.--/.--. --- .-- . .-. ..-. ..- .-..');
console.log(msg1.toAlpha()); // Should print: OBJECTS IN JAVASCRIPT ARE VERY POWERFUL
console.log(msg1.toMorse()); // Should print the original morse code

let msg2 = new Message('I am learning how to use Objects in JavaScript');
console.log(msg2.toMorse()); // Should print the morse code translation
console.log(msg2.toAlpha()); // Should print: I AM LEARNING HOW TO USE OBJECTS IN JAVASCRIPT