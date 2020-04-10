$(document).ready(function() {
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  $(document).on("click", "button.delete", handleChallengeDelete);
  $(document).on("click", "button.edit", handleChallengeEdit);
  var challenges;
  var i = 0;
  getChallenges();
  function getChallenges() {
    $.get("/api/challenge", function(data) {
      console.log("Challenge", data);
      Challenge = data;
      if (!Challenge|| !Challenge.length) {
        displayEmpty();
      }
      else {
        initializeRows(Challenge);
      }
    });
  };

  function getIssued() {
    $.get("/api/issued", function(data) {
      Challenge = data;
      if (!Challenge|| !Challenge.length) {
        return;
      }
      else {
        initializeRows(Challenge);
      }
    });
  };

  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/challenge/" + id
    })
      .then(function() {
        getChallenges(postCategorySelect.val());
      });
  };

  function initializeRows() {
    var challengesToAdd = [];
    for (var i = 0; i < Challenge.length; i++) {
      challengesToAdd.push(createNewRow(Challenge[i]));
    };
    blogContainer.append(challengesToAdd);
  };

  function createNewRow(Challenge) {
    var formattedDate = new Date(Challenge.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Written by: " + Challenge.challenger);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(Challenge.title + " ");
    newPostBody.text(Challenge.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("challenges", challenges);
    if(i === 0) {
      i=i+1;
      getIssued();
    }
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handleChallengeDelete() {
    var currentChallenge = $(this)
      .parent()
      .parent()
      .data("challenge");
    deletePost(currentChallenge.id);
  }

  // This function figures out which challenge we want to edit and takes it to the appropriate url
  function handleChallengeEdit() {
    var currentChallenge = $(this)
      .parent()
      .parent()
      .data("challenge");
    window.location.href = "/cms?challenge_id=" + currentChallenge.id;
  }

  // This function displays a message when there are no challenges
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;///pushing
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No challenges yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});
