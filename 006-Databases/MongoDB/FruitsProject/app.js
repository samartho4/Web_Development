const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// To Insert a single Fruit
// const fruit = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit."
// })

// fruit.save();

const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit."
})

const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
})

const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weird Texture"
})

Fruit.insertMany([kiwi, orange, banana], function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully saved all fruits to fruitsDB!");
    }
});

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(fruits);
    }
})