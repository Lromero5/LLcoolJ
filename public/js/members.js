$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });

  function countWatched (array) {
    let count = 0
    for(let i =0; i< array.length; i++) {
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
        let movie = element.title;
        let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          let movieDiv = $("<div class='movie'>");
          let rating = response.Rated;
          let pOne = $("<p>").text("Rating: " + rating);
          movieDiv.append(pOne);
          let released = response.Released;
          let pTwo = $("<p>").text("Released: " + released);
          movieDiv.append(pTwo);;
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
  }



  $(document).on("click", ".chipcount", function(){
    $.ajax({
      url: "/changestatus/" + $(this).attr("name"),
      type: "Put",
    }).then(function(data){
      console.log(data)
    });
    this.remove();  

    addchips();
  });

  let chips = 0;

  function addchips() {
      chips= chips + 1;
  
    $.ajax({
      url: "/addchip",
      type: "Put",
    }).then(function(data){
      console.log(data)
    });
  };


  $.ajax({
    url: "/ultimatecouchpotato",
    type: "Get"
  }).then(function(data){
    let list = $("<ul> Top Users </ul>")
    data.forEach(function(ultimatecouchdata){
      // console.log("this is the ultimate couch data", ultimatecouchdata)
      
      let item1 = $("<li>").text(ultimatecouchdata.username)
      list.append(item1);

    });

    $(".ultimatecouchpotato").append(list); 
  });


  getWatching();

});