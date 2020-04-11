$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });

  function countWatched (array) {
    let count = 0
    for(let i =0; i< array.length; i++) {
      if(array[i].completed) {
        count ++
      }
    }
    $('#showCount').text( "Chip Count:  " + count)
  };

  function getWatching() {
    $.get("/api/watching", function(data) {
      countWatched(data)
      data.forEach(function(element) { 
        let movie = element.title;
        let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          let movieDiv = $("<div class='movie watchingcard'>");
          let title = response.Title;
          let pOne = $("<p>").text(title);
          movieDiv.append(pOne);
          let imgURL = response.Poster;
          let image = $("<img>").attr("src", imgURL);
          movieDiv.append(image);
          $("#library").append(movieDiv);

          if( !element.completed ) {
            let completebtn = $("<button>").text('Complete').addClass("chipcount").attr("name", movie)
            movieDiv.append(completebtn);
          }
        });
      });
    });
  };

  $(document).on("click", ".chipcount", function(){
    $.ajax({
      url: "/changestatus/" + $(this).attr("name"),
      type: "Put",
    });
    this.remove();  

    addchips();
  });

  let chips = 0;

  function addchips() {
      chips= chips + 1;
  
    $.ajax({
      url: "/addchip",
      type: "Put",
    });
  };

  $.ajax({
    url: "/ultimatecouchpotato",
    type: "Get"
  }).then(function(data){
    let list = $("<ul class='ultimatelist'> </ul>")
    data.forEach(function(ultimatecouchdata){
      
      let item1 = $("<li class='items'>").text(ultimatecouchdata.username)
      list.append(item1);

    });

    $(".ultimatecouchpotato").append(list); 
  });


  getWatching();

});