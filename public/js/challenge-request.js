$(document).ready(function() {
  // Getting jQuery references to the challenge body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var friendSelect = $("#friend");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a challenge)
  var url = window.location.search;
  var challengeId;
  var friendId;
  // Sets a flag for whether or not we're updating a challenge to be false initially
  var updating = false;
  //Friend Info
  // var friendID = element.requester;

  // If we have this section in our url, we pull out the challenge id from the url
  // In '?challenge_id=1', challengeId is 1
  if (url.indexOf("challenge_id=") !== -1) {
    challengeId = url.split("=")[1];
    getChallengeData(challengeId, "challenge");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our USER
  else if (url.indexOf("?friend_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the Friends, and their challenges
  getFriends();

  // A function for handling what happens when the form to create a new challenge is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the challenge if we are missing a body, title, or user
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newChallenge object to hand to the database
    var newChallenge = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      UserId: userSelect.val()
    };

    // If we're updating a challenge run updateChallenge to update a challenge
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newChallenge.id = challengeId;
      updateChallenge(newChallenge);
    }
    else {
      submitChallenge(newChallenge);
    }
  }

  // Submits a new challenge and brings user to board page upon completion
  function submitChallenge(challenge) {
    $.challenge("/api/challenge", challenge, function() {
      window.location.href = "/challenge-board";
    });
  }

  // Gets challenge data for the current challenge if we're editing, or if we're adding to an author's existing challenges
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
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        UserId = data.UserId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get User and then render our list of User
  // function getFriends() {
  //   $.get("/api/request", renderFriendList);
  // }
  function getFriends() {
    $.get("/api/request", function(data) {
      console.log(data);
      data.forEach(function(element) {
        console.log(element.requester );
        var friendId = element.requester;
        console.log(friendId)
     }, renderFriendList);
      
    });
  }

  getFriends();
  
  // Function to either render a list of friends, or if there are none, direct the user to the page
  // to create an author first
  function renderFriendList(data) {
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createFriendrRow(data[i]));
    }
    friendSelect.empty();
    console.log(rowsToAdd);
    console.log(friendSelect);
    friendSelect.append(rowsToAdd);
    friendSelect.val(friendId);
  }



  // Creates the friend options in the dropdown
  function createFriendrRow() {
    var listOption = $("<option>");
    listOption.attr("value", friendId); //EDIT Made
    listOption.text(friendId);
    
    
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updateChallenge(post) {
    $.ajax({
      method: "PUT",
      url: "/api/challenge",
      data: post
    })
      .then(function() {
        window.location.href = "/challenge-board";
      });
  }
});
