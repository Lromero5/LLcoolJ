function displayMovieInfo() {

    var movie = $("#movie-input").val();
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
      movieDiv.append(pTwo);
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
      movieDiv.append(pFour);
      var type = response.Type;
      var pFour = $("<p>").text("Type: " + type);
      movieDiv.append(pFour);
      var imgURL = response.Poster;
      var image = $("<img>").attr("src", imgURL);
      movieDiv.append(image);
      $("#movies-view").prepend(movieDiv);
      console.log(response);
     
      var savebtn = $("<button>").text('SAVE').addClass("savedbtn");
      savebtn.attr('name', response.Title);
      movieDiv.append(savebtn);
    });
  
  }

  $("#add-movie").on("click", displayMovieInfo);

  $(document).on("click", ".savedbtn", function(){
    console.log("you got clicked!")
    console.log($(this).attr("name"));
    var newmovie = {
      title: $(this).attr("name")
    };

    $.ajax({
      url: "/savemovie",
      type: "POST",
      data: newmovie
    }).then(function(data){
      console.log(data);
    })

  });
