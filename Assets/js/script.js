var searchEl = document.querySelector('#searchBtn');
var titleEl = document.querySelector('.city');
var fiveDay = document.querySelector('.five-day');


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

        var tempURL = tempURL + '?lat=' + lat + '&lon=' + lon +'&appid=e54dee0cc53d0b5d7fada68322d11e01'

        console.log(tempURL);

        fetch(tempURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (tempLoc) {
        console.log(tempLoc)
      })

      // printData(tempLoc);

      })
      .catch(function (error) {
        console.error(error);
      });
  }

// Display content for Current Weather


  



