$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});


function getWatching() {
  $.get("/api/watching", function(data) {
    console.log(data);
    data.forEach(function(element) {
      var movie = element.title;
      var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
    
        var movieDiv = $("<div class='movie'>");
        var rating = response.Rated;
        var pOne = $("<p>").text("Rating: " + rating);
        movieDiv.append(pOne);
        var released = response.Released;
        var pTwo = $("<p>").text("Released: " + released);
        movieDiv.append(pTwo);;
        var imgURL = response.Poster;
        var image = $("<img>").attr("src", imgURL);
        movieDiv.append(image);
        $("#library").append(movieDiv);
      });
    });
    
  });
}


//this is getting everything that the user is watching from our db
function getWatching() {
  $.get("/api/watching", function(data) {
    console.log(data);
  });

};

getWatching();