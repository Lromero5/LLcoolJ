
  function sendRequest() {
    $.get("/api/user", function(data) {
      var userSearch = $("#user-search").val();
      var users = data;
      users.forEach(function(element) {
        console.log(element);
      if(userSearch === element.username) {
        $.ajax({
          url: "/friendrequest",
          type: "POST",
          data: element
        }).then(function(data){
          console.log(data);
        })
      }
      else {
        console.log("no user by that id");
      }
      });
    });
  };

  function getRequest() {
    $("#pending").empty();
    $.get("/api/request", function(data) {
      data.forEach(function(element) {
        var allFriends = $("<div>");
        var friendID = element.requester;
        var pOne = $("<p>").text("friendly friend: " + friendID);
        allFriends.append(pOne);
        var acceptbtn = $("<button class='accept'>").text('accept').val(element.id);;
        var declinebtn = $("<button class='decline'>").text('decline').val(element.id);
        acceptbtn.attr('onclick', "accept(" + element.id + ")");
        declinebtn.attr('onclick', "decline(" + element.id + ")");
        allFriends.append(acceptbtn);
        allFriends.append(declinebtn);

        $("#pending").append(allFriends);
      });
      
    });
  }

  function getFriends() {
    $("#friends").empty();
    $.get("/api/friends", function(data) {
      data.forEach(function(element) {
        var allFriends = $("<div>");
        var friendID = element.requester;
        var pOne = $("<p>").text("friendly friend: " + friendID);
        allFriends.append(pOne);
        var completebtn = $("<button>").text('view').addClass("friendButton").val(element.requester);
        allFriends.append(completebtn);
        $("#friends").append(allFriends);
      });
      
    });
  }

  function decline(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/request/" + id
      })
        .then(getRequest);
  };

  function accept(id) {
    $.ajax({
      method: "PUT",
      url: "/api/friends/" + id
    })
      .then(getFriends);
      
  };

  function getFriendWatching(username) {
    $.get("/api/watching/" + username, function(data) {
      $("#library").empty();
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

  getFriends();
  getRequest();
  
  $("#friend-finder").on("click", sendRequest);

  $(document).on("click", ".friendButton", function() {
    getFriendWatching(this.value);
  });