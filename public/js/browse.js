function displayMovieInfo() {

  let movie = $("#movie-input").val();
  let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      var movieDiv = $("<div class='movie'>");
      var rating = response.Rated;
      var pOne = $("<p>").text("Rating: " + rating);
      movieDiv.append(pOne);
      var imgURL = response.Poster;
      var image = $("<img>").attr("src", imgURL);
      movieDiv.append(image);
      $("#movies-view").empty();
      $("#movies-view").append(movieDiv);
     
      var savebtn = $("<button>").text('Save to Library').addClass("savedbtn");
      savebtn.attr('name', response.Title);
      movieDiv.append(savebtn);
    });
  
  };

  $("#add-movie").on("click", displayMovieInfo);

  $(document).on("click", ".savedbtn", function(){
    var newmovie = {
      title: $(this).attr("name")
    };

    $.ajax({
      url: "/savemovie",
      type: "POST",
      data: newmovie
    });
  });

