// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the challenges
  app.get("/api/challenge", function(req, res) {
    var query = {};
    if (req.query.friend_id) {
      query.friendId = req.query.friend_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Challenges
    db.Users.findAll({
      where: query,
      include: [db.Users]
    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  // Get route for retrieving a single challenge
  app.get("/api/challenge/:id", function(req, res) {
//not sure about the ID portion above
    
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Challenges.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

///this is where the 500 error is coming from

  // POST route for saving a new challenge
  app.post("/api/challenge", function(req, res) {
    db.Challenges.create(req.body).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/challenge/:id", function(req, res) {
    db.Challenges.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  // PUT route for updating posts
  app.put("/api/challenge", function(req, res) {
    db.Challenges.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });
};
