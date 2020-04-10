$(document).ready(function() {
  var blogContainer = $(".blog-container");
  $(document).on("click", "button.delete", handleChallengeDelete);
  var challenges;
  var i = 0;
  getChallenges();

  function getChallenges() {
    $.get("/api/challenge", function(data) {
      console.log("Challenge", data);
      Challenge = data;
      if (!Challenge|| !Challenge.length) {
        getIssued();
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
        displayEmpty();
      }
      else {
        initializeRows(Challenge);
      }
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
    deleteBtn.val(Challenge.id);
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
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("challenges", challenges);
    if(i === 0) {
      i=i+1;
      getIssued;
    }
    return newPostCard;
  };

  function handleChallengeDelete() {
    var id = $(this).val();
    $.ajax({
      method: "DELETE",
      url: "/api/challenge/" + id
    })
    .then(function() {
      i = 0;
      blogContainer.empty();
    })
    .then(getChallenges);
  };

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    };
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No challenges yet" + partial + ", navigate <a href='/challenge-request" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  };

});
