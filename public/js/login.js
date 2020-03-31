

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
  });

}

$("#add-movie").on("click", displayMovieInfo);

$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

