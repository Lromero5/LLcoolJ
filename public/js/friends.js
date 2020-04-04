
  function sendRequest() {
    $.get("/api/user", function(data) {
      var userSearch = parseInt($("#user-search").val());
      var users = data;
      users.forEach(function(element) {

      if(userSearch === element.id) {
        $.ajax({
          url: "/friendrequest",
          type: "POST",
          data: element
        }).then(function(data){
          console.log(data);
          getFriends;
        })
      }
      else {
        console.log("no user by that id");
      }
      });
    });
  };

  function getFriends() {
    $.get("/api/request", function(data) {
      console.log(data);
      data.forEach(function(element) {
        console.log(element.requester );
        var allFriends = $("<div>");
        var friendID = element.requester;
        var pOne = $("<p>").text("friendly friend: " + friendID);
        allFriends.append(pOne);
        $("#friends").append(allFriends);
      });
      
    });
  }

  getFriends();
  
  $("#friend-finder").on("click", sendRequest);
  