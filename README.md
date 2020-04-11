# Team LLcoolJ

Project Title: Couch Potato

Purpose: We wanted to make an application where we could keep track of shows and movies we 
had plans to watch or had watched and could share this data with our friends to initiate 
converstation and prevent unwanted spoilers.

Code style: The entire project was made using a mixture of standard html-5 and 6 along with
jquery and sequilize.

Framework: All databases are made through mySql and most formatting is handled by either bulma 
or Bootstrap respectively.

Example Code:
    Back End -  
    <!-- these are two of our more important api routes, the first allowing us to pull the username
    and id of the current user on any page while the second lets of query for a specific user by their
    username -->
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

    Front End -
    <!-- this bit of code pulls a users list of shows with the first api request then runs each
    item in that data through a external api to eventually post that response to our main html
    page. Lastly it checks back to the first call for a boolean and if false it generates one more element
    to the page -->
        function getWatching() {
            $.get("/api/watching", function(data) {
            countWatched(data)
            data.forEach(function(element) { 
                let movie = element.title;
                let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function (response) {
                let movieDiv = $("<div class='movie watchingcard'>");
                let title = response.Title;
                let pOne = $("<p>").text(title);
                movieDiv.append(pOne);
                let imgURL = response.Poster;
                let image = $("<img>").attr("src", imgURL);
                movieDiv.append(image);
                $("#library").append(movieDiv);

                if( !element.completed ) {
                    let completebtn = $("<button>").text('Complete').addClass("chipcount").attr("name", movie)
                    movieDiv.append(completebtn);
                }
                });
            });
            });
        };

Installation: Everything a future editor should need is in our package.json file. A basic npm install 
should have all the bases covered.

API Reference: any information regarding the api used can be found at http://www.omdbapi.com/

How to use: 
    1) On initial load the user should be brought to our signup page. Simply input a valid email, username, and password into there respective fields and hit submit. The user will then be redirected to their home page.
    ** if the user has already made their account they may click on the link that takes them to the login page
    enter there username and password and hit submit to reach the their home page.

    2) Once on thier home page the user can either start adding and sending out friend request to other users
    with our friend search form displayed on the right side of the scree, or they can click on the browse link 
    in the nav bar to start adding shows and movies to their personal libraries.

    3) After some from friends and shows have been added for the user they should see them populated onto their
    home page. Clicking on a complete button in their library will add to their total "chip count" the scoreing system for Couch Potato. Clicking on any name in their friends list will display that friends library of 
    shows and movies in place of the users.

    4) Finally the user may click on the challenge Your Friends link in the navbar to start sending watching challenges
    to their anyone in their friends list.

Makers:
    Couch Potato was made by Leticia Romero, Leighton Shallenber, and Jonathan Contreras. The full project can be find at https://github.com/Lromero5/LLcoolJ and access at http://llcoolj.herokuapp.com/