$(document).ready(function() {
  let challengeContainer = $(".challenge-container");
  let issuedContainer = $(".issued-container");
  $(document).on("click", ".del", handleChallengeDelete);
  let challenges;
  let i = 0;
  getChallenges();

  function getChallenges() {
    $.get("/api/challenge", function(data) {
      Challenge = data;
      if (!Challenge|| !Challenge.length) {
        getIssued();
      }
      else {
        initializeRows(Challenge, "cha");
      }
    });
  };

  function getIssued() {
    $.get("/api/issued", function(data) {
      Issued = data;
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
    let formattedDate = new Date(value.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    let newPostCard = $("<div>");
    newPostCard.addClass("card");
    let newPostCardHeading = $("<div>");
    let deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("del");
    deleteBtn.val(value.id);
    let newPostTitle = $("<h3>");
    let newPostDate = $("<small>");
    let newPostCardBody = $("<div>");
    let newPostBody = $("<p>");
    newPostTitle.text("Title: " + value.title + " ");
    newPostBody.text(value.challenger + " said: " + value.body);
    newPostDate.text(formattedDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCard.data("challenges", challenges);
    if(i === 0) {
      i=i+1;
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
    let query = window.location.search;
    let partial = "";
    if (id) {
      partial = " for User #" + id;
    };
    blogContainer.empty();
    let messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No challenges yet" + partial + ", navigate <a href='/challenge-request" + query +
    "'>here</a> in order to get started.");
    challengeContainer.append(messageH2);
    issuedContainer.append(messageH2);
  };

});
