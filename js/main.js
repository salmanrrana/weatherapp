$(function() {
  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  var apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';

  // main feature of website is to get weather data from the city you are searching

  // api below looks at location of IP address
  function getIpLocation() {
    var getIP = $.ajax({
      url: 'http://ip-api.com/json',
      method: 'GET'
    })
    //this gets the IP location
    getIP.done(function(response){
      console.log("City that we are in: ", response.city);
      getWeatherData(response.city);
      forecast(response.city);
    })
    getIP.fail(function(error){
      console.log(error);
    })

  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//API for getting the weather
  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      data: {
        // the query or the entry from form is represented by q
        q: city,
        appid: apiKey,
        units: 'imperial',
      }
    });

    // these functions below are the responses
    getWeather.done(function(response) {
      // console.log(response);


      var city = response.name;
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var description = response.weather[0].description;

      console.log(city, temperature, humidity);
      // put API response on the page
      $('.results .results-city').text(city);
      $('.temperature-container .temperature').text(temperature + 'º');
      $('.humidity-container .humidity').text(humidity + '%');
      $('.description-container .description').text(description);
      $('.weather-icon').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
      $('.the-forecast').empty();
    });

    getWeather.fail(function(error) {
      $('.city-error').show('p').fadeOut(3000);
    });
  }


  function setHandlers() {
    // doing this in order to target the form
    $('.getWeatherData').on('submit', function(e) {
      e.preventDefault();
      //doing this in order to target the weather-city within the form getWeatherData
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
      forecast(city);
    })
  }

  function forecast(city) {
    var getForecast = $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      method: 'GET',
      data: {
        // the query or the entry from form is represented by q
        q: city,
        appid: apiKey,
        units: 'imperial',
      }
    });
    // these functions below are the responses
    getForecast.done(function(response) {
      console.log('this is the response: ', response);
      var city = response.city.name;
      // var icon = response.list[i].weather[0].icon;

      for (i=0, x=response.list.length; i<5; i++) {
        console.log('i is: ', i);
        var temperatureForecast = response.list[i].main.temp;
        // var time = response.list[i].dt;
        console.log('Hi Im the future temp: ', temperatureForecast);
        // console.log('This temp ', response.list[4].main.temp);
        // $('.the-forecast').html('<li>'+time+'</li>');
        $('.the-forecast').append('<li>'+temperatureForecast+'º</li>');
      };
    getForecast.fail(function(error) {
      console.log('you done fucked up');
    });
  });
};

  // the flow of our web app -- the main function that controls the other functions and puts it together
  //looks for IP address and then gets weather for the location of IP address
  function main() {
    getIpLocation();
    setHandlers();
  }

  main();
});


//____________________________________________________________
