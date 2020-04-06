// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    // res.json({
    //   email: req.user.email,
    //   id: req.user.id
    // });
    let email = req.body.email;
    let password = req.body.password;

    db.User.findOne({ where: { email: email } }).then(function (user) {
      if (!user) {
        res.redirect('/login');
      } else if (!user.validPassword(password)) {
        res.redirect('/login');
      } else {
        console.log('valid info received')
        req.session.user = user.dataValues;
        console.log(req.session.user)
        res.redirect('/members');
      }
    });    
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    req.session.user = null;
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/savemovie", function(req, res){
    // console.log("we hit the route", req.body);
    // console.log("This is our user ", req.session.user.id);

    db.Watching.create({title: req.body.title, UserId: req.session.user.id})
    .then(function(data){
      console.log(data);
    })

  })

  app.post("/friendrequest", function(req, res){
    // console.log("we hit the route", req.body);
    // console.log("This is our user ", req.session.user.id);
    db.Request.create({requester: req.session.user.id, UserId: req.body.id})
    .then(function(data){
      console.log(data);
    })
  })

  //this is grabbing everything that the user is watching from our database
  app.get("/api/watching", function(req, res) {
        db.Watching.findAll({
          where: {
            UserId: req.session.user.id,
          }
        }).then(function(dbWatching) {
          res.json(dbWatching);
  });
  });

  app.get("/api/user", function(req, res) {
    db.User.findAll({
      attributes: ['id']
    }).then(function(data) {
      res.json(data);
  });
  });

  app.get("/api/request", function(req, res) {
    db.Request.findAll({
      where: {
        UserId: req.session.user.id,
      }
    }).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  app.delete("/api/request/:id", function(req, res) {
    db.Request.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });
};

