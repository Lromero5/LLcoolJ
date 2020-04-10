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
