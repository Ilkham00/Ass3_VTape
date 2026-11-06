// External API (playlists.html): sample tracks for a genre from the public iTunes Search API.
// fetch() with async/await. The API needs no key. If the request fails the page shows a message.

$(function () {
  const $form = $('#sample-form');
  const $genre = $('#sample-genre');
  const $status = $('#sample-status');
  const $list = $('#sample-list');

  // the search word for every option of the select
  const terms = {
    rock: 'rock',
    'noise-pop': 'noise pop',
    'k-pop': 'k-pop',
    neo: 'neo soul',
    'j-pop': 'j-pop',
    indie: 'indie'
  };

  // builds one list item; .text() and .attr() keep the data out of the HTML code
  function buildItem(track) {
    const $item = $('<li class="sample-item"></li>');
    const $info = $('<div class="sample-info"></div>');

    // only secure picture links are used
    if (typeof track.artworkUrl100 === 'string' && track.artworkUrl100.indexOf('https://') === 0) {
      $('<img class="sample-cover" width="60" height="60">')
        .attr('src', track.artworkUrl100)
        .attr('alt', 'Cover of ' + track.trackName)
        .appendTo($item);
    }

    $('<strong class="sample-title"></strong>').text(track.trackName).appendTo($info);
    $('<span class="sample-artist"></span>').text(track.artistName).appendTo($info);
    $info.appendTo($item);

    if (typeof track.previewUrl === 'string' && track.previewUrl.indexOf('https://') === 0) {
      $('<audio controls preload="none"></audio>')
        .attr('src', track.previewUrl)
        .attr('aria-label', 'Preview of ' + track.trackName)
        .appendTo($item);
    }
    return $item;
  }

  async function loadTracks(key) {
    const url = 'https://itunes.apple.com/search?media=music&entity=song&limit=50&term=' +
          encodeURIComponent(terms[key]);

    $list.empty();
    $status.text('Loading tracks...');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('The server answered with status ' + response.status);
      }
      const data = await response.json();
      const tracks = (data.results || []).filter(function (track) {
        return track.trackName && track.artistName;
      });

      if (tracks.length === 0) {
        $status.text('No tracks found for this genre. Try another one.');
        return;
      }

      const shuffled = [...tracks];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const selected = shuffled.slice(0, 6);

      selected.forEach(function (track) {
        $list.append(buildItem(track));
      });
      $status.text('Showing ' + selected.length + ' tracks for ' + $genre.find('option:selected').text() + '.');
    } catch (error) {
      $status.text('Could not load the tracks. Check your internet connection and try again.');
    }
  }

  $form.on('submit', function (event) {
    event.preventDefault();
    loadTracks($genre.val());
  });
});
