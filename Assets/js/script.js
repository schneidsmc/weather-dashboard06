var searchEl = document.querySelector('#searchBtn');
var titleEl = document.querySelector('.city');
var fiveDay = document.querySelector('.five-day');
var currentCity = document.querySelector('#currentCity');
var currentTemp = document.querySelector('#currentTemp');
var currentHumidity = document.querySelector('#currentHumidity');
var currentWind = document.querySelector('#currentWind');


// Event Listening to get the Input Value
searchEl.addEventListener('click', btn);

function btn (event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#myInput').value;
    
console.log(searchInputVal)
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    localStorage.setItem('searchInputVal', searchInputVal);

    var previousInputs = JSON.parse(localStorage.getItem('searchInputs')) || [];

    previousInputs.push(searchInputVal);

    localStorage.setItem('searchInputs', JSON.stringify(previousInputs));



  searchApi(searchInputVal);

}

// Search API with value to find Lat/Lon then finding correspinging weather
  function searchApi(searchInputVal) {
    var geoURL = 'https://api.openweathermap.org/geo/1.0/direct';
  
    geoURL = geoURL + '?q=' + searchInputVal + '&limit=1&appid=e54dee0cc53d0b5d7fada68322d11e01'
  
    fetch(geoURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
  
        console.log(locRes);

        var searchLoc = locRes[0]

        var lat = searchLoc.lat;
        var lon = searchLoc.lon;

        var tempURL = 'https://api.openweathermap.org/data/2.5/forecast'

        var tempURL = tempURL + '?lat=' + lat + '&lon=' + lon +'&units=imperial&appid=e54dee0cc53d0b5d7fada68322d11e01'

        console.log(tempURL);

    fetch(tempURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (weatherData) {
        console.log(weatherData);
        console.log("City:", weatherData.city.name);
        console.log("Temperature:", weatherData.list[0].main.temp);
        console.log("Humidity:", weatherData.list[0].main.humidity);
        console.log("Wind:", weatherData.list[0].wind.speed);
        console.log(weatherData.list[0].weather[0].icon)
      
        printResults(weatherData);

        fiveResults(weatherData);

      })

    
      })
      .catch(function (error) {
        console.error(error);
      });
    }

function printResults(weatherData) {
var temp = weatherData.list[0].main.temp;
var humidity = weatherData.list[0].main.humidity;
var wind = weatherData.list[0].wind.speed;
var name = weatherData.city.name

currentCity.innerHTML = name;
currentTemp.innerHTML = 'Temp: ' + temp + ' F';
currentHumidity.innerHTML = 'Humidity: ' + humidity + '%';
currentWind.innerHTML = 'Wind: ' + wind;

}

function fiveResults(weatherData) {

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
}





