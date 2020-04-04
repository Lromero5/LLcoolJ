
var path = require("path");


var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  app.get("/browse", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/browse.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/challenge-request", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/challenge-request.html"));
  });

  app.get("/challenge-board", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/challenge-board.html"));
  });

};