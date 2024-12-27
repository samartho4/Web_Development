const express = require("express");
const bodyParser = require("body-parser");
const postmark = require("postmark");

const app = express();

// Set up Postmark API client
const postmarkClient = new postmark.ServerClient("d9b26387-3de1-4b75-8571-563ba8040fa7"); // Replace with your Postmark API key

// Serve static files from the "public" directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the signup form
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// Handle form submission
app.post("/", function (req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    // Email content
    const message = {
        From: "ssharma604@myseneca.ca", // Replace with your sender email from Postmark
        To: email,
        Subject: "Welcome to Our Newsletter!",
        TextBody: `Hi ${firstname} ${lastname},\n\nThank you for signing up for our newsletter!`
    };

    // Send email using Postmark
    postmarkClient.sendEmail(message, (error, result) => {
        if (error) {
            console.error("Postmark error:", error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log("Postmark success:", result);
            res.sendFile(__dirname + "/success.html");
        }
    });
});


// Route for handling failure button
app.post("/failure", function (req, res) {
    res.redirect("/");
});

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.");
});
postmarkClient.sendEmail(message, (error, result) => {
    if (error) {
        console.error("Postmark error:", error); // Logs error details in the terminal
        res.sendFile(__dirname + "/failure.html");
    } else {
        console.log("Postmark success:", result); // Logs success response in the terminal
        res.sendFile(__dirname + "/success.html");
    }
});
