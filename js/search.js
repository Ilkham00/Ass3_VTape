// Task 3 - Filter content as the user types (playlists.html)

var searchInput = document.getElementById('search-input');
var cards = document.querySelectorAll('#playlists-grid .playlist-card');
var searchCount = document.getElementById('search-count');
var noResults = document.getElementById('no-results');

searchInput.addEventListener('input', function () {
  // ignore letter case and spaces at the start and the end
  var text = searchInput.value.trim().toLowerCase();
  var shown = 0;

  for (var i = 0; i < cards.length; i++) {
    var title = cards[i].querySelector('h2').textContent.toLowerCase();

    if (title.includes(text)) {
      cards[i].hidden = false;
      shown = shown + 1;
    } else {
      cards[i].hidden = true;
    }
  }

  searchCount.textContent = 'Showing ' + shown + ' of ' + cards.length + ' genres';
  noResults.hidden = shown !== 0;
});
