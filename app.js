$(document).ready(function() {
  var min = new Date(1995, 5, 16).getTime();
  var max = new Date().getTime();
  var randomDate = Math.round(min+(Math.random()*(max-min)));
  console.log(randomDate);
  randomDate = new Date(randomDate) //converts back to regular format
  console.log(randomDate);
  var randomYear = randomDate.getFullYear().toString();
  var randomMonth = (0+(randomDate.getMonth()+1).toString()).slice(-2);
  var randomDay = (0+(randomDate.getDate().toString())).slice(-2);
  console.log(randomYear);
  console.log(randomMonth);
  console.log(randomDay);
  var apodUrl = `https://api.nasa.gov/planetary/apod?api_key=BPygtzXU1HsTWk8Vvlf4RQnlP55Dwcr0R81avSIl&date=${randomYear}-${randomMonth}-${randomDay}`;
  
  $.ajax({
    url: apodUrl,
    method: 'GET',
    success: function(result){
      $("#img").attr("src", result.url);
      $("#title").text(result.title);
      $("#explanation").text(result.explanation);
      if("copyright" in result) {
        $("#copyright").text("Image Credits: " + result.copyright);
      }
      else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      } 
    }
  });
  
  
  var peepsUrl = 'http://api.open-notify.org/astros.json'
  $.ajax({
    url: peepsUrl,
    method: 'GET',
    success: function(result){
      $('#numofdogs').text(`Number of people in space represented by dogs = ${result.number}`);
      var people = result.people
      people.forEach(person => {
        var dogApi = 'https://dog.ceo/api/breeds/image/random'
          $.ajax({
            url: dogApi,
            method: 'GET',
            success: function(result){
              console.log(result);
              var card = `<div class='card'>
                              <img class="cardimg" src=${result.message}>
                              <div class="container">
                                <h4>${person.name}</h4>
                                <h5>${person.craft}</h5>
                              </div>
                            </div>`;
                $('#dogs').append(card) 
            }
          });
      });
      }
    }
  );
}) 