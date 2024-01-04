var searchEl = document.querySelector('#searchBtn');
var titleEl = document.querySelector('.city');
var fiveDay = document.querySelector('.five-day');


function btn (event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#myInput').value;
    
console.log(searchInputVal)
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    //Set the search params in the URL (i.e. `?q=london&format=photo`)
  var queryString = './index.html?q=' + searchInputVal;
console.log(queryString)
  location.assign(queryString);
}

searchEl.addEventListener('click', btn);

var currentCity = document.querySelector('.city');
var fiveDay = document.querySelector('.five-day');

function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('=');
  console.log(searchParamsArr)
    // Get the query and format values
    var query = searchParamsArr[1].split('=').pop();
    console.log(query)
    searchApi(query);
  }

  function searchApi(query) {
    var geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
  
    geoURL = geoURL + '?q=' + query + '&limit={limit}&appid={e54dee0cc53d0b5d7fada68322d11e01}'
  
    fetch(geoURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        // resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function weatherPrint(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.name;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Temp:</strong> ' + resultObj + '<br/>';
  
    if (resultObj) {
      bodyContentEl.innerHTML +=
        '<strong>Wind:</strong> ' + resultObj + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Wind:</strong> No wind reading.';
    }
  
    if (resultObj) {
      bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong> ' + resultObj;
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong>  No humidity reading.';
    }
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    resultContentEl.append(resultCard);
  }



  getParams();