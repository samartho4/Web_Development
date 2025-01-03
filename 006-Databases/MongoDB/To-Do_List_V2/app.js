const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connecting to the to do list database
// mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

// Creating a schema
const itemsSchema = new mongoose.Schema({
  name: String
})

// Creating a model
const Item = mongoose.model("Item", itemsSchema);

// Creating default documents
const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];

// Creating a new schema for custom lists
const ListSchema = {
  name: String,
  items: [itemsSchema]
};

// Creating a model
const List = mongoose.model("List", ListSchema);

// HOME ROUTE
app.get("/", function (req, res) {
  console.log("Home route accessed");

  Item.find({}, function (err, foundItems) {
    console.log("Items in the database:", foundItems);

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (!err) {
          console.log("Default items added to the database.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// ADD NEW ITEM
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  console.log(`New item to add: "${itemName}" in list: "${listName}"`);

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    console.log(`Item "${itemName}" saved to the "Today" list.`);
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      console.log(`Item "${itemName}" added to list "${listName}".`);
      res.redirect("/" + listName);
    });
  }
});

// DELETE ITEM
app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;

  console.log(`Request to delete item with ID: "${checkedItemID}" from list: "${listName}"`);

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemID, function (err) {
      if (!err) {
        console.log(`Item with ID "${checkedItemID}" deleted from the "Today" list.`);
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemID } } },
      function (err, foundList) {
        if (!err) {
          console.log(`Item with ID "${checkedItemID}" deleted from list "${listName}".`);
          res.redirect("/" + listName);
        }
      }
    );
  }
});


// =================== CUSTOM LIST ROUTE ====================
app.get("/:customListName", function(req, res) {
  // Using lodash to avoid changing lists when case is changed
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList) {
    if (err) {
      console.log(err);
    }
    else {
      if (!foundList) {
        // Create a new list
        const list = new List ({
          name: customListName,
          items: defaultItems
        })
      
        list.save();
        res.redirect("/" + _.capitalize(customListName));
      }
      else {
        // Show an existing list
        res.render("list", {listTitle: _.capitalize(customListName), newListItems: foundList.items});
      }
    }
  })
})

// For deployment purposes
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
// Listening for requests
app.listen(port, function() {
  console.log("Server has started successfully.");
});

