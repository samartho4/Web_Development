function whosPaying(names) {
    
    /******Don't change the code above*******/
        
        //Write your code here.
        let possibleIndex = Math.floor((Math.random()) * names.length);
        let value = `${names[possibleIndex]} is going to buy lunch today!`;
        return value;
    
    /******Don't change the code below*******/    
}
let names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
console.log(whosPaying(names));  // Instead of just console.log(value);