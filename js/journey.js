// User journey (contacts.html): the favourites from the Playlists page
// can be copied into the demo message.

$(function () {
  const $hint = $('#favourites-hint');
  let names = [];

  try {
    const saved = JSON.parse(localStorage.getItem('vintagetape-favourites'));
    if (Array.isArray(saved)) {
      names = saved.filter(function (name) {
        return typeof name === 'string' && name !== '';
      });
    }
  } catch (error) {
    // nothing saved
  }

  if (names.length > 0) {
    $hint.removeClass('is-hidden');
  }

  $('#use-favourites').on('click', function () {
    const $message = $('#contact-message');
    $message.val('Please make a catalog with these genres: ' + names.join(', ') + '.');
    $message.trigger('input').trigger('focus');
  });
});
