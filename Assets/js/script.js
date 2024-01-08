var searchEl = document.querySelector('#searchBtn');
var titleEl = document.querySelector('.city');
var fiveDay = document.querySelector('.five-day');
var currentContainer = document.querySelector('.currentContainer')
var clearBtn = document.querySelector('.clear');


// Initial function beginning with the click on the search button.
searchEl.addEventListener('click', btn);

function btn (event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#myInput').value;
    
console.log(searchInputVal)
// Unrecognizable input will alert user to try again.
if (!searchInputVal) {
  alert('Unrecognizable Input');
        console.error('You need a search input value!');
        return;
    }
// Search city will be stored in the Local Storage to be displayed as a search history.
    localStorage.setItem('searchInputVal', searchInputVal);

    var previousInputs = JSON.parse(localStorage.getItem('searchInputs')) || [];

    previousInputs.push(searchInputVal);

    localStorage.setItem('searchInputs', JSON.stringify(previousInputs));

    if (previousInputs.length > 10) {
      previousInputs.shift(); 
  }

  // Runs the function to load the Search History when the page loads so the user can click one instead of typing.
  loadSearchHistory();
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

        // API using the lat/long to find the corresponding city.
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
      // Testing the response of the API.
      .then(function (weatherData) {
        console.log(weatherData);
        console.log("City:", weatherData.city.name);
        console.log("Temperature:", weatherData.list[0].main.temp);
        console.log("Humidity:", weatherData.list[0].main.humidity);
        console.log("Wind:", weatherData.list[0].wind.speed);
        console.log(weatherData.list[0].weather[0].icon)
      
      // Functions called to display the current weather and the 5-day forecast.
        printResults(weatherData);

        fiveResults(weatherData);

      })
      })
      .catch(function (error) {
        console.error(error);
      });
    }
    
// Current Weather function.
function printResults(weatherData) {
  var currentContainer = document.querySelector('.currentContainer');
  currentContainer.innerHTML = ''; 

// Variables designated from the API response.
var temp = weatherData.list[0].main.temp;
var humidity = weatherData.list[0].main.humidity;
var wind = weatherData.list[0].wind.speed;
var name = weatherData.city.name
var iconCode = weatherData.list[0].weather[0].icon;
var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

// Creating an element to display information.
var card = document.createElement('div');
      card.classList.add('card', 'p-2');
// Organizing the card content with a variable.
var cardContent = `
          <h2 class="card-title">${name}</h2>
          <img class="weatherIcon" src="${iconUrl}" alt="Weather Icon" />
          <p class="card-text">Temp: ${temp} F</p>
          <p class="card-text">Humidity: ${humidity}%</p>
          <p class="card-text">Wind: ${wind}</p>
      `;
// Appending information to the Card. 
    card.innerHTML = cardContent;
      currentContainer.appendChild(card);

}

// Five-day forecast function.
function fiveResults(weatherData) {
  var fiveDayContainer = document.querySelector('.five-day');
  fiveDayContainer.innerHTML = ''; 
  // Designating the amount of days with a for-loop.
  for (var i = 1; i < 6; i++) {
      var card = document.createElement('div');
      card.classList.add('card', 'p-2');
// Displaying the date as mm/dd for each day.
      var date = new Date(weatherData.list[i * 7].dt * 1000);
      var dateString = (date.getMonth() + 1).toString().padStart(1, '0') + '/' + date.getDate().toString().padStart(1, '0');
// Variables displaying in the days from the API.
      var temp = weatherData.list[i * 7].main.temp;
      var humidity = weatherData.list[i * 7].main.humidity;
      var wind = weatherData.list[i * 7].wind.speed;
      var iconCode = weatherData.list[i * 7].weather[0].icon;

      var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
// Organizing card content.
      var cardContent = `
          <h5 class="card-title">${dateString}</h5>
          <img src="${iconUrl}" alt="Weather Icon" />
          <p class="card-text">Temp: ${temp} F</p>
          <p class="card-text">Humidity: ${humidity}%</p>
          <p class="card-text">Wind: ${wind}</p>
      `;
// Appeniding information to five cards for each day. 
      card.innerHTML = cardContent;
      fiveDayContainer.appendChild(card);
  }
}

// Search History Buttons from local storage. 
function loadSearchHistory() {
    var searchHistoryContainer = document.querySelector('.searchHistory');
    searchHistoryContainer.innerHTML = '';

    var recentSearches = JSON.parse(localStorage.getItem('searchInputs')) || [];

    for (var i = 0; i < recentSearches.length; i++) {
        var button = document.createElement('button');
     
        button.textContent = recentSearches[i];

        button.classList.add('btn');

        button.addEventListener('click', function () {
          
            var clickedSearch = this.textContent;
            searchApi(clickedSearch);
        });
// Displaying each city already search as a button to click that will start the function back at the searchAPI() function.
        searchHistoryContainer.appendChild(button);
        
    }
}
// Clear history button to delete searched cites from local storage.
  var clearBtn = document.querySelector('.clear')
  var searchList = document.querySelector('.searchHistory')
  clearBtn.addEventListener('click', function clearLocalStorage() {
    localStorage.clear();
    clearList()
  })
  function clearList(){
    searchList.innerHTML = ('');
  }

