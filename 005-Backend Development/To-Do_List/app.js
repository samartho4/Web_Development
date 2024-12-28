const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Code", "Listen Music"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//res.sendFile() to send static HTML files. and res.render() to send dynamic EJS templates.
app.get("/", function(req, res) {
    const day = date.getDate();
   res.render('list', {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
    const item = req.body.newItem;
    items.push(item);

    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server started at port 3000.");
})