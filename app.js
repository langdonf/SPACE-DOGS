$(document).ready(function() {
  // Date of first APOD in Unix Time
  var min = new Date(1995, 5, 16).getTime();
  // Current date in Unix Time
  var max = new Date().getTime();
  //Subtracts min time from max time and bultiplies by random number between 0 and 1 to get random time between min and max
  var randomDate = Math.round(min+(Math.random()*(max-min)));
  console.log(randomDate);
  //converts to regular format
  randomDate = new Date(randomDate) 
  console.log(randomDate);
  //pulls year in YYYY format
  var randomYear = randomDate.getFullYear();
  //pulls month but returns only one digit if less than 10 and is 0 indexed, add 1, convert to string so I can add a 0 to the front, and pulls the last two digits so it comes out in in MM format
  var randomMonth = (0+(randomDate.getMonth()+1).toString()).slice(-2);
  //pulls day but returns 1 digit if less than 10, convert to string, and add 0, pulls last two digits
  var randomDay = (0+(randomDate.getDate().toString())).slice(-2);
  console.log(randomYear);
  console.log(randomMonth);
  console.log(randomDay);

  //Nasa Astronomy Picture of the Day API/
  var apodUrl = `https://api.nasa.gov/planetary/apod?api_key=BPygtzXU1HsTWk8Vvlf4RQnlP55Dwcr0R81avSIl&date=${randomYear}-${randomMonth}-${randomDay}`;
  $.ajax({
    url: apodUrl,
    method: 'GET',
    success: function(result){
      //Sets background image, title, description, and copyright info
      $("#img").attr("src", result.url);
      $("#title").text(result.title);
      $("#explanation").text(result.explanation);
      if("copyright" in result) {
        $("#copyright").text("Image Credits: " + result.copyright);
      } else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      } 
    }
  });
  
  //  Number of people in space and random dogs picture APIs 
  var astrosUrl = 'http://api.open-notify.org/astros.json'
  $.ajax({
    url: astrosUrl,
    method: 'GET',
    success: function(result){
      // Sets title and appends number of people
      $('#numofdogs').html(`Number of people in space represented by dogs = <span>${result.number}</span>`);
      var people = result.people
      // For each person in space pulls random dog picture, creates card with name and current spaceship and adds dog picture
      people.forEach(person => {
        //Removes the space from the astronaut name so I can plug it into wikipedia
        var searchTerm = person.name.split(' ').join('_')
        var dogApi = 'https://dog.ceo/api/breeds/image/random'
          $.ajax({
            url: dogApi,
            method: 'GET',
            success: function(result){
              var card = `<div class='card'>
                          <a href="https://en.wikipedia.org/wiki/${searchTerm}"><img class="cardimg" src=${result.message}>
                            <div class="container">
                              <h4>${person.name}</h4>
                              <h5>${person.craft}</h5>
                            </div></a>
                          </div>`;
                $('#dogs').append(card) 
            }
          });
      });
    }
  });
});