
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

  function getRequest() {
    $("#pending").empty();
    $.get("/api/request", function(data) {
      data.forEach(function(element) {
        var allFriends = $("<div>");
        var friendID = element.requester;
        var pOne = $("<p>").text("friendly friend: " + friendID);
        allFriends.append(pOne);
        var acceptbtn = $("<button class='accept'>").text('Accept').val(element.id);;
        var declinebtn = $("<button class='decline'>").text('decline').val(element.id);
        declinebtn.attr('onclick', "accept(" + element.id + ")");
        declinebtn.attr('onclick', "decline(" + element.id + ")");
        allFriends.append(acceptbtn);
        allFriends.append(declinebtn);

        $("#pending").append(allFriends);
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

  getRequest();
  
  $("#friend-finder").on("click", sendRequest);

  