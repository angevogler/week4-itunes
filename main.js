/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

//define global variables and assign DOM elements
let searchBtn = document.querySelector("#search-btn");
let userInput = document.querySelector("#search-bar");
let player = document.querySelector('.player');

searchBtn.addEventListener("click", function () {
  fetch (`https://itunes.apple.com/search?term=${userInput.value}`)
    .then(convertFromJson)
    .then(showArtistDeets);
});

function convertFromJson(artist) {
  return artist.json();

}

function showArtistDeets(artist) {
  console.log(artist);
  let results = document.querySelector('.results');
  let artistDisplay = '';

  for (let i = 0; i < artist.results.length; i++) {

    let artistResults = artist.results[i];

    let artistCode = `
      <div class="track-info">
        <img src="${artistResults.artworkUrl100}" class="track-image">
        <h4 class="song-name">${artistResults.trackName}</h4>
        <h3 class="artist-name">${artistResults.artistName}</h3>
      </div>
    `;
    artistDisplay += artistCode;
  }
  results.innerHTML += artistDisplay;
}
