
var path = require("path");


var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  app.get("/browse", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/browse.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

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