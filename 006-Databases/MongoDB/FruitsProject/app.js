const mongoose = require('mongoose');
// Load environment variables from .env file
require('dotenv').config();

// Suppress strictQuery warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        performDatabaseOperations();
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Define the Fruit schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema,
});

// Create Models
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

async function performDatabaseOperations() {
    try {
        // Insert a single fruit
        const apple = new Fruit({
            name: "Apple",
            rating: 7,
            review: "Pretty solid as a fruit.",
        });
        await apple.save();
        console.log('Apple saved successfully!');

        // Insert multiple fruits
        const kiwi = new Fruit({
            name: "Kiwi",
            rating: 10,
            review: "The best fruit.",
        });
        const orange = new Fruit({
            name: "Orange",
            rating: 4,
            review: "Too sour for me.",
        });
        const banana = new Fruit({
            name: "Banana",
            rating: 3,
            review: "Weird Texture.",
        });
        await Fruit.insertMany([kiwi, orange, banana]);
        console.log("Successfully saved all fruits to fruitsDB!");

        // Create a new fruit and associate it with a person
        const pineapple = new Fruit({
            name: "Pineapple",
            rating: 9,
            review: "Great Fruit!",
        });
        await pineapple.save();

        const amy = new Person({
            name: "Amy",
            age: 12,
            favouriteFruit: pineapple,
        });
        await amy.save();
        console.log('Person saved successfully!');

        // Reading data from the database
        const fruits = await Fruit.find();
        console.log('Fruits:');
        fruits.forEach(fruit => console.log(fruit.name));

        // Updating a document
        await Fruit.updateOne(
            { name: "Orange" },
            { name: "Peach", review: "Peaches are pretty good!" }
        );
        console.log("Successfully updated the document!");

        // Deleting a document
        await Fruit.deleteOne({ name: "Banana" });
        console.log("Document Successfully deleted");

        // Deleting multiple documents
        await Fruit.deleteMany({ name: "Apple" });
        console.log("Documents Successfully Deleted");
    } catch (error) {
        console.error('Error during database operations:', error.message);
    } finally {
        // Close the database connection after all operations
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
}
