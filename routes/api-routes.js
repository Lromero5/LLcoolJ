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
    let username = req.body.username;
    let password = req.body.password;

    db.User.findOne({ where: { username: username } }).then(function (user) {
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

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    req.session.user = null;
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {

    if (!req.session.user) {
      res.json({});

    } else {
      res.json({
        username: req.session.user.username,
        id: req.session.user.id
      });
    };
  });

  app.get("/api/user", function(req, res) {
    db.User.findAll({
      attributes: ['username', "id"]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/user/:id" , function(req, res) {
    db.User.findOne({
      where: {
        username: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/savemovie", function(req, res){
    db.Watching.create({title: req.body.title, UserId: req.session.user.id})
    .then(function(data){
      console.log(data);
    });
  });

  app.get("/api/watching", function(req, res) {
    db.Watching.findAll({
      where: {
        UserId: req.session.user.id,
      }
    }).then(function(dbWatching) {
      res.json(dbWatching);
    });
  })

  app.get("/api/watching/:id", function(req, res) {
    console.log(req.params);
    db.Watching.findAll({
      where: {
        UserId: req.params.id,
      }
    }).then(function(dbWatching) {
      res.json(dbWatching);
    });
  });

  app.post("/friendrequest", function(req, res){
    db.Request.create({requester: req.session.user.username, UserId: req.body.id, accepted:false})
    .then(db.Request.create({requester:  req.body.username , UserId: req.session.user.id, accepted:true}));
  });

  app.get("/api/friends", function(req, res) {
    db.Request.findAll({
      where: {
        UserId: req.session.user.id,
        accepted: true,
      }
    }).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  app.put("/api/friends/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.session.user.id
      }

    }).then(function(data) {
      db.Request.update(
        {accepted: true},
        {where: {
          id: req.params.id
        }}
      ).then(function(dbRequest) {
      res.json(dbRequest);
      });
    });
  });

  app.get("/api/request", function(req, res) {
    db.Request.findAll({
      where: {
        UserId: req.session.user.id,
        accepted: false,
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
    }).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  app.post("/api/challenge", function(req, res) {
    const userData = {
      ...req.body,
      UserId: req.session.user.id
    };
    console.log(userData);
    db.Challenges.create(userData)
    .then(function(dbChallenges) {
      res.json(dbChallenges);
    })
    .catch((err) => {
      console.log(err)
    });
  });

  app.get("/api/challenge", function(req, res) {
    db.Challenges.findAll({
      where: {
        UserId: req.session.user.id
      }

    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  app.get("/api/issued", function(req, res) {
    db.Challenges.findAll({
      where: {
        friendId: req.session.user.username
      }

    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  app.delete("/api/challenge/:id", function(req, res) {
    db.Challenges.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChallenges) {
      res.json(dbChallenges);
    });
  });

  app.put("/changestatus/:title", function(req, res){
    db.Watching.findOne({
      where: {
        UserId: req.session.user.id,
      }
    }).then(function(data){
      console.log("about to do an update", req.params.title)
      db.Watching.update(
        {completed: true}, 
        {where: {
          UserId: req.session.user.id,
          title: req.params.title
        }}
      ).then(function(updatedata, err){
        console.log("coming from the backend ", updatedata, err)
      });
    });
  });
  
  app.put("/addchip", function(req, res){
    db.User.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(function(data){
      var newtotal= data.dataValues.chips +1 
      db.User.update(
        {chips: newtotal}, 
        {where: {
          id: req.session.user.id
        }}
      ).then(function(updatedata){
        // console.log(updatedata)
      });
    });
  });

  app.get("/ultimatecouchpotato", function(req, res){
    db.User.findAll({
      order: [
        [
          "chips", "DESC"
        ]
      ]
    }).then(function(ultimatedata){
      var top5= []
      for(i = 0; i < ultimatedata.length && i < 5; i++){
        top5.push(ultimatedata[i])
      }
      res.json(top5);
    });
  });

};


