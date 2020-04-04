
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
        })
      }
      else {
        console.log("no user by that id");
      }
      });
    });
  };
  
  $("#friend-finder").on("click", sendRequest);
  