/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

//define global variables and assign DOM elements
const container = document.querySelector('.container');
let searchBtn = document.querySelector('#search-btn')
let userInput = document.querySelector("#search-bar");
let player = document.querySelector('.player');
let musicPlayer = document.querySelector(".music-player");
let results = document.querySelector('.results');

// fetch function to reuse for multiple event listeners
function getArtistResults() {
  fetch (`https://itunes.apple.com/search?term=${userInput.value}`)
    .then(convertFromJson)
    .then(showArtistDeets);
    // .then(playSong);
}

// added event listener when press enter in userInput to display results (changing audio src)
userInput.addEventListener("keyup", function (ev) {
  // 13 is the code for "enter"
  if (ev.keyCode === 13) {
    getArtistResults();
  }
});

// added event listener when click submit button to display results
searchBtn.addEventListener("click", getArtistResults);

// added event listener to individual song result to play song clicked on
results.addEventListener("click", function (ev) {
  console.log("inside the results click event listener");

  // saving a reference to the originating event element
  var currentTarget = ev.target;

  // do while loop - should only run once
  do {
    // .. if our current element has a track-info class..
    if (currentTarget.classList.contains('track-info')) {
      // change the music player's src to the value of the song ur;
      musicPlayer.src = currentTarget.getAttribute('data-song-url');
      console.log(`changing player src to ${currentTarget.getAttribute('data-song-url')}`)

      // play the song
      musicPlayer.play();

      // break out of the loop (we've done what we needed to do)
      break;
    }

    // traverse the DOM by going to its parent
    currentTarget = currentTarget.parentElement;
  } while (currentTarget !== null);
});

// convert API to JSON
function convertFromJson (artist) {
  return artist.json();
}

// show the artist search results and designate which song to play
function showArtistDeets (artist) {
  console.log(artist);

  let artistDisplay = '';

  for (let i = 0; i < artist.results.length; i++) {

    let artistResults = artist.results[i];
    // display search results
    let artistCode = `
      <div class="track-info" data-song-url="${artistResults.previewUrl}">
        <img src="${artistResults.artworkUrl100}" class="track-image">
        <h4 class="song-name">${artistResults.trackName}</h4>
        <h3 class="artist-name">${artistResults.artistName}</h3>
      </div>
    `;
    artistDisplay += artistCode;

    // play song
    songToPlay = artistResults.previewUrl;

    // display song to play
  }
  results.innerHTML = artistDisplay;
}
