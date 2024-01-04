var searchEl = document.querySelector('#searchBtn');

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

  location.assign(queryString);
}

searchEl.addEventListener('submit');
