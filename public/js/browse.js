function displayMovieInfo() {

  let movie = $("#movie-input").val();
  let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      let movieDiv = $("<div class='movie'>");
      let rating = response.Rated;
      let pOne = $("<p>").text("Rating: " + rating);
      movieDiv.append(pOne);
      let imgURL = response.Poster;
      let image = $("<img>").attr("src", imgURL);
      movieDiv.append(image);
      $("#movies-view").empty();
      $("#movies-view").append(movieDiv);
     
      let savebtn = $("<button>").text('Save to Library').addClass("savedbtn");
      savebtn.attr('name', response.Title);
      movieDiv.append(savebtn);
    });
  
  };

  $("#add-movie").on("click", displayMovieInfo);

  $(document).on("click", ".savedbtn", function(){
    let newmovie = {
      title: $(this).attr("name")
    };

    $.ajax({
      url: "/savemovie",
      type: "POST",
      data: newmovie
    });
  });

