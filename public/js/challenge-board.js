$(document).ready(function() {
  var challengeContainer = $(".challenge-container");
  var issuedContainer = $(".issued-container");
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
        console.log(i);
        initializeRows(Challenge, "cha");
      }
    });
  };

  function getIssued() {
    $.get("/api/issued", function(data) {
      Issued = data;
      console.log(data);
      if (!Issued|| !Issued.length) {
        return;
      }
      else {
        initializeRows(Issued, "iss");
      };
    });
  };

  function initializeRows(value, whats) {
    
    var challengesToAdd = [];
    
    for (var i = 0; i < value.length; i++) {
      challengesToAdd.push(createNewRow(value[i]));
    };
    if 
    (whats == "cha" ){
       challengeContainer.append(challengesToAdd);
    }
   else {
     issuedContainer.append(challengesToAdd);
   }
    

  };

  function createNewRow(value) {
    console.log(value);
    var formattedDate = new Date(value.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    deleteBtn.val(value.id);
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Written by: " + value.challenger);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(value.title + " ");
    newPostBody.text(value.body);
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
      console.log(i);
      getIssued();
    }
    return newPostCard;
  };

  function handleChallengeDelete() {
    $(this).closest(".card").remove();
    var id = $(this).val();
    $.ajax({
      method: "DELETE",
      url: "/api/challenge/" + id
    })
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
    challengeContainer.append(messageH2);
    issuedContainer.append(messageH2);
  };

});
