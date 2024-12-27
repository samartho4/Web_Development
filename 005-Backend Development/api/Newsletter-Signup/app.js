require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const postmark = require("postmark");

const app = express();

// Set up Postmark API client
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY); // Securely load API key

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
// Basic validation
if (!email || !email.includes("@")) {
    return res.sendFile(__dirname + "/failure.html");
}
    // Email content with dynamic user data
    const message = {
        From: "ssharma604@myseneca.ca",
        To: email,
        Subject: `Welcome, ${firstname}!`,
        TextBody: `Hello ${firstname} ${lastname},\n\nThank you for signing up for our newsletter!`,
    };

    // Send email using Postmark
    postmarkClient.sendEmail(message, (error, result) => {
        if (error) {
            console.error("Postmark Error Details:", error); // Logs the exact error
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log("Postmark Success Response:", result);
            res.sendFile(__dirname + "/success.html");
        }
    });
});



// Route for handling failure button
app.post("/failure", function (req, res) {
    res.redirect("/");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

