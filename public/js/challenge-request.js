$(document).ready(function() {
    let currentUser ="";
  $.get("/api/user_data").then(function(data) {
    currentUser = data.username;
  });
  let bodyInput = $("#body");
  let titleInput = $("#title");
  let cmsForm = $("#cms");
  let friendSelect = $("#friend");
  $(cmsForm).on("submit", handleFormSubmit);
  
  let url = window.location.search;
  let challengeId;
  let updating = false;

  function handleFormSubmit(event) {
    event.preventDefault();
    let newChallenge = {
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
    let queryUrl;
    switch (type) {
    case "challenge":
      queryUrl = "/api/challenge/" + id;
      break;
    case "user":
      queryUrl = "/api/user/" + Userid;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        titleInput.val(data.title);
        bodyInput.val(data.body);
        UserId = data.UserId || data.id;

        updating = true;
      };
    });
  };

  function getFriends() {
    $.get("/api/friends", function(data) {

     renderFriendList(data);
    });
  }

  getFriends();
  
  function renderFriendList(data) {
    $(".hidden").removeClass("hidden");
    for (let i = 0; i < data.length; i++) {
      friendSelect.append(createFriendrRow(data[i])[0]);
    };

  };

  function createFriendrRow(friendId) {
    let listOption = $("<option>");
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
