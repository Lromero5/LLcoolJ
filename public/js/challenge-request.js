$(document).ready(function() {
    let currentUser ="";
  $.get("/api/user_data").then(function(data) {
    currentUser = data.username;
  });
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var friendSelect = $("#friend");
  console.log(friendSelect.val());
  $(cmsForm).on("submit", handleFormSubmit);
  
  var url = window.location.search;
  var challengeId;
  var updating = false;

  function handleFormSubmit(event) {
    event.preventDefault();
    var newChallenge = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      challenger: currentUser,
      friendId: friendSelect.val()
    };

    if (updating) {
      newChallenge.id = challengeId;
      updateChallenge(newChallenge);
    }
    else {
      submitChallenge(newChallenge);
    };
  };

  function submitChallenge(newChallenge) {
    $.post("/api/challenge", newChallenge, function() {
      window.location.href = "/challenge-board";
    });
  };

  function getChallengeData(id, type) {
    var queryUrl;
    switch (type) {
    case "challenge":
      queryUrl = "/api/challenge/" + id;
      break;
    case "user":
      queryUrl = "/api/user/" + Userid; // Review
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        titleInput.val(data.title);
        bodyInput.val(data.body);
        UserId = data.UserId || data.id;

        updating = true;
      };
    });
  };

  function getFriends() {
    $.get("/api/friends", function(data) {
      console.log("!!!!!!!!!!!!!!!",data); 

     renderFriendList(data);
    });
  }

  getFriends();
  
  function renderFriendList(data) {
    $(".hidden").removeClass("hidden");
    for (var i = 0; i < data.length; i++) {
      friendSelect.append(createFriendrRow(data[i])[0]);
    };

  };

  function createFriendrRow(friendId) {
    var listOption = $("<option>");
    console.log(friendId);
    listOption.attr("value", friendId.requester);
    listOption.text(friendId.requester);
    
    
    return listOption;
  };

  function updateChallenge(newChallenge) {
    $.ajax({
      method: "PUT",
      url: "/api/challenge",
      data: newChallenge
    })
      .then(function() {
        window.location.href = "/challenge-board";
      });
  };
});
