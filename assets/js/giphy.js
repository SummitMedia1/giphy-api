 $(document).ready(function(){

    var interestsArray = ['Harley Davidson', 'Fender Stratocaster', 'Photography', 'Washington Redskins', 'The Godfather', 'Goodfellas', 'U2', 'Rush', 'Dog Boxer'];
    
    // console.log(interestsArray);

        function renderButtons() {    
        $("#buttons-view").empty();
        // interestsArray.sort();
        for (var i = 0; i < interestsArray.length; i++) {
         var a = $("<button>");
          a.addClass("jiffy");
          a.attr("data-name", interestsArray[i]);
          a.text(interestsArray[i]);
          $("#buttons-view").append(a);
        }
      }

    $("#userInput").on("click", function(event){
    event.preventDefault(); 
    var interest = $("#searchInput").val();
    console.log(interest);
    interestsArray.push(interest);
    renderButtons();
    $("#searchInput").val("");

  });

renderButtons();

      $(document).on("click", ".jiffy", function(){
        $("#gifs-appear-here").empty();
      var interest = $(this).attr('data-name');
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + interest + "&api_key=dc6zaTOxFJmzC&limit=10";

    console.log(queryURL);
    console.log(this);
     
         $.ajax({
          url: queryURL,
          method: "GET"
        })

   .done(function(response) {
      // $("div").remove(".interests");
      var results = response.data;
      for(var j = 0; j < results.length; j++) {
        var newDiv = $("<div class='jiffy'>");
        var rating = $('<p>').text('Rating: ' + results[j].rating);
        var newImage = $('<img>');
        newImage.attr("src", results[j].images.fixed_height_still.url);
        newImage.attr("data-still", results[j].images.fixed_height_still.url);
        newImage.attr("data-animate", results[j].images.fixed_height_still.url);
        newDiv.prepend(rating);
        newDiv.prepend(newImage);
        $('#gifs-appear-here').prepend(newDiv);
      }
    });

  $(document).on("click", "img", function() { 
    if ($(this).attr("src") != $(this).attr("data-animate")) {
      $(this).attr("src", $(this).attr("data-animate"));
    } else {
      $(this).attr("src", $(this).attr("data-still"));
    $("#gifs-appear-here").empty();
}
 renderButtons();
});
});
});

function refresh() {
        location.reload();
    }
