$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});


//this is getting everything that the user is watching from our db
function getWatching() {
  $.get("/api/watching", function(data) {
    console.log(data);
  })
};

getWatching();