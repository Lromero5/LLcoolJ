$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});


function getWatching() {
  $.get("/api/watching", function(data) {
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

        var completebtn = $("<button id='banana'>").text('Complete').addClass("chipcount");
        completebtn.attr('onclick', "addchips()");
        movieDiv.append(completebtn);

      });
    });
    
  });
}

let chips = 0;

function addchips() {
    chips= chips + 1;
    console.log("this is my chip count " + chips);
 
    let counter=
       document.getElementById("showCount");
         counter.innerHTML="Number of shows/movies watched is: " + chips ;
  $("#banana").remove();

  $.ajax({
    url: "/addchip",
    type: "Put",
  }).then(function(data){
    console.log(data)
  })


}

$.ajax({
  url: "/ultimatecouchpotato",
  type: "Get"
}).then(function(data){
  console.log(data)
  data.forEach(function(ultimatecouchdata){

    var item1 = $("<p>").text(ultimatecouchdata.email)
    $("#ultimatecouchpotatoe").append(item1);

  })
})


getWatching();
