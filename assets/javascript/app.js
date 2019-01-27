$(document).ready(function(){

  var topics = ["cha cha", "macarena", "swing dance", "in my feelings challenge"];

//function to display the buttons on the page
function displayGifButtons(){
  
  //.empty empties the buttons
    $("#gifButtonsView").empty(); 

    //for loop to loop thru the topics array
    for (var i = 0; i < topics.length; i++){

      //jquery to create the button
        var gifButton = $("<button>");

        // gifButton.addClass("action");
        //creating the class for the new button
        gifButton.addClass("btn btn-primary")

        //giving the new button an attribute with the topics index
        gifButton.attr("data-name", topics[i]);

        //giving the new button the text of the topics index
        gifButton.text(topics[i]);

        //adding the new button by appending it
        $("#gifButtonsView").append(gifButton);
    }
}
//calling the displayGifButtons 
 displayGifButtons();

 //  on click function adds new gif button to the page that a user inputs
 $("#add-gif").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox and removes empty spaces from each side
    var topic = $("#gif-input").val().trim();

    // Adding/pushing gif from the textbox the user enters to array
    topics.push(topic);

    // Calling displayGifButtons function which handles the displaying of gif array
    displayGifButtons();
    
    //empties the value entered by the user after the click of the search button
    $("#gif-input").val("");
  });

$(document).on("click", ".btn-primary", function() {
    // Grabbing and storing the data-name property value from the button
    var gif = $(this).attr("data-name");
    
    // Constructing a queryURL using the gif name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gif + "&api_key=SAnxEHNpqOmgjhmnfN5iDe3YNr4Vx5RF&limit=3";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable so you can call the variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div>");
          //giving it a class so that I may call the div in CSS to add styling
          gifDiv.addClass("gifDiv");          

          // Creating a paragraph tag with the result item's rating which is grabbed from giphy doc
          var gifRating = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag which is also used to call when adding CSS styling
          var gifImage = $("<img>");

          // Setting the src attribute of the image to a property pulled off the result item
          gifImage.attr("src", results[i].images.fixed_height.url);
          // gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          

          // Appending the paragraph and image tag to the gifDiv
          gifDiv.append(gifRating);
          gifDiv.append(gifImage);

          // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

  
  });


