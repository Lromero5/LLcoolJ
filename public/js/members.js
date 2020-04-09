$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });



function countWatched (array) {
  var count = 0
  for(var i =0; i< array.length; i++) {
    if(array[i].completed) {
      count ++
    }
  }
  $('#showCount').text( "Look at all the CHIPS you've earned!!  " + count)
}

function getWatching() {
  $.get("/api/watching", function(data) {
    countWatched(data)
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
        // console.log("what is happening");
        var released = response.Released;
        var pTwo = $("<p>").text("Released: " + released);
        movieDiv.append(pTwo);;
        var imgURL = response.Poster;
        var image = $("<img>").attr("src", imgURL);
        movieDiv.append(image);
        $("#library").append(movieDiv);


        if( !element.completed ) {
          var completebtn = $("<button id='banana'>").text('Complete').addClass("chipcount").attr("name", movie)
          movieDiv.append(completebtn);
        }
      });
    });
    
  });
}

$(document).on("click", ".chipcount", function(){
  $.ajax({
    url: "/changestatus/" + $(this).attr("name"),
    type: "Put",
  }).then(function(data){
    console.log(data)
  })
  $("#banana").remove();  

addchips();
})

let chips = 0;

function addchips() {
    chips= chips + 1;
 
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
  var list = $("<ul> Top Users </ul>")
  data.forEach(function(ultimatecouchdata){
    // console.log("this is the ultimate couch data", ultimatecouchdata)
    
    var item1 = $("<li>").text(ultimatecouchdata.email)
    list.append(item1);

  })

  $(".ultimatecouchpotato").append(list); 
})


getWatching();

});