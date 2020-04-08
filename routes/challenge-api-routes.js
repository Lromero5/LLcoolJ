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
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Challenges
    db.Users.findAll({

    }).then(function(dbChallenges) {
      res.json(dbChallenges);
      console.log("fkdslhglsdkhgsdaklghsldkhfkdshf;lsadfhlsdk;fhas")
    });
  });


///this is where the 500 error is coming from

  // POST route for saving a new challenge
  app.post("/api/challenge", function(req, res) {
    // console.log("%%%%%",req.session.user.id);

    const userData = {
      ...req.body,
      UserId: req.session.user.id
    };

    db.Challenges.create(userData)
    .then(function(dbChallenges) {
      // console.log("%%%%%",dbChallenges);
      res.json(dbChallenges);
    })
    .catch((err) => {
      console.log('?????????????????????????')
      console.log(err)
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
