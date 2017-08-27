 $(document).ready(function(){

    var interestsArray = ['Harley Davidson', 'Fender Stratocaster', 'Photography', 'Washington Redskins', 'The Godfather', 'Goodfellas', 'U2', 'Rush', 'Dog Boxer'];

        function renderButtons() {    
        $("#buttons-view").empty();
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
      var interest = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + interest + "&api_key=dc6zaTOxFJmzC&limit=10";
     
         $.ajax({
          url: queryURL,
          method: "GET"
        })

   .done(function(response) {
      var results = response.data;
      for(var i = 0; i < results.length; i++) {
        var newDiv = $("<div class='jiffy' data-state='still'>");
        var rating = $('<p>').text('Rating: ' + results[i].rating);
        var newImage = $('<img>');
        newImage.attr("src", results[i].images.fixed_height_still.url);
        newImage.attr({'data-animate' : results[i].images.fixed_height.url});
        newImage.attr({'data-state' : "still"});
        newImage.attr({'data-still' : results[i].images.fixed_height_still.url});
        // newImage.attr("src", results[i].images.fixed_height_still.url);
        // newImage.attr("data-still", results[i].images.fixed_height_still.url);
        // newImage.attr("data-animate", results[i].images.fixed_height.url);
        newDiv.append(rating);
        newDiv.append(newImage);
        $('#gifs-appear-here').append(newDiv);
      }
    });

          $(".jiffy").on("click", function(){

                  var state = $(this).attr('data-state');
                  
                
                 if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

});
 renderButtons();
});

function refresh() {
        location.reload();
    }


 
