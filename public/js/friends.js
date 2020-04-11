
  function sendRequest() {
    $.get("/api/user", function(data) {
      let userSearch = $("#user-search").val();
      let users = data;
      users.forEach(function(element) {
      if(userSearch === element.username) {
        $.ajax({
          url: "/friendrequest",
          type: "POST",
          data: element
        }).then(
          getFriends()
        );
      }
      });
    });
  };

  function getRequest() {
    $("#pending").empty();
    $.get("/api/request", function(data) {
      data.forEach(function(element) {
        let allFriends = $("<div>");
        let friendID = element.requester;
        let pOne = $("<p>").text(friendID);
        allFriends.append(pOne);
        let acceptbtn = $("<button class='accept'>").text('accept').val(element.id);;
        let declinebtn = $("<button class='decline'>").text('decline').val(element.id);
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
        let allFriends = $("<div>");
        let friendID = element.requester;
        let completebtn = $("<button>").text(friendID).addClass("friendButton").val(friendID);
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
      .then(
        getFriends
      )
      .then(
        getRequest
      );   
  };

  function getFriendId(friend) {
    $.get("/api/user/" + friend).then(function(data) {
    getFriendWatching(data.id);
    });
  };

  function getFriendWatching(id) {

    $.get("/api/watching/" + id, function(data) {
      $("#library").empty();
      data.forEach(function(element) { 
        let movie = element.title;
        let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          let movieDiv = $("<div class='movie'>");
          let title = response.Title;
          let pOne = $("<p>").text(title);
          movieDiv.append(pOne);
          let imgURL = response.Poster;
          let image = $("<img>").attr("src", imgURL);
          movieDiv.append(image);
          $("#library").append(movieDiv);
  
        });
      });
    });
  };

  getFriends();
  getRequest();
  
  $("#friend-finder").on("click", sendRequest);

  $(document).on("click", ".friendButton", function() {
    getFriendId(this.value);
  });