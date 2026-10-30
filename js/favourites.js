// Task 4 - Manage dynamic content: favourites list (playlists.html)
// Remove buttons and the "+ Favourite" buttons use delegated .on() handlers.

$(function () {
  const $form = $('#favourites-form');
  const $input = $('#favourite-input');
  const $list = $('#favourite-list');
  const $count = $('#favourite-count');
  const $empty = $('#favourite-empty');
  const $error = $('#favourite-error');
  const $status = $('#favourite-status');
  const storageKey = 'vintagetape-favourites';

  $status.hide();

  // the names that are in the list now
  function getNames() {
    return $list.find('.favourite-text').map(function () {
      return $(this).text();
    }).get();
  }

  function exists(name) {
    const lower = name.toLowerCase();
    return getNames().some(function (item) {
      return item.toLowerCase() === lower;
    });
  }

  // count, empty-state message, card buttons and saved copy always match the list
  function refresh() {
    const total = $list.children('.favourite-item').length;
    $count.text('Items: ' + total);
    $empty.toggleClass('is-hidden', total !== 0);

    $('.add-favourite').each(function () {
      const added = exists($(this).attr('data-name'));
      $(this)
        .toggleClass('added', added)
        .attr('aria-pressed', added ? 'true' : 'false')
        .text(added ? 'In favourites' : '+ Favourite');
    });

    try {
      localStorage.setItem(storageKey, JSON.stringify(getNames()));
    } catch (error) {
      // the list still works without saving
    }
  }

  // second effect: a short message fades in and out; the count above stays visible
  function showStatus(text) {
    $status.stop(true, true).text(text).fadeIn(200).delay(1800).fadeOut(400);
  }

  function addItem(name) {
    const $item = $('<li class="favourite-item"></li>');
    // .text() inserts the user text safely
    $('<span class="favourite-text"></span>').text(name).appendTo($item);
    $('<button type="button" class="btn-reset remove-button"></button>')
      .text('Remove')
      .attr('aria-label', 'Remove ' + name)
      .appendTo($item);
    $list.append($item);
  }

  function removeItem(name) {
    $list.find('.favourite-item').filter(function () {
      return $(this).find('.favourite-text').text().toLowerCase() === name.toLowerCase();
    }).remove();
  }

  // saved list from the last visit
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved)) {
      saved.forEach(function (name) {
        if (typeof name === 'string' && name !== '') {
          addItem(name);
        }
      });
    }
  } catch (error) {
    // no saved list
  }
  refresh();

  // add by the form
  $form.on('submit', function (event) {
    event.preventDefault();

    const text = $.trim($input.val());

    if (text === '') {
      $input.val('');
      $error.text('Please type something before adding.').removeClass('is-hidden');
      return;
    }
    if (exists(text)) {
      $error.text(text + ' is already in the list.').removeClass('is-hidden');
      return;
    }

    $error.addClass('is-hidden');
    addItem(text);
    refresh();
    showStatus('Added: ' + text);
    $input.val('').trigger('focus');
  });

  $input.on('input', function () {
    $error.addClass('is-hidden');
  });

  // delegated: works for items that were added later
  $list.on('click', '.remove-button', function () {
    const name = $(this).siblings('.favourite-text').text();
    $(this).closest('.favourite-item').remove();
    refresh();
    showStatus('Removed: ' + name);
  });

  // delegated: the button of a playlist card adds or removes that genre
  $('#playlists-grid').on('click', '.add-favourite', function () {
    const name = $(this).attr('data-name');

    if (exists(name)) {
      removeItem(name);
      showStatus('Removed: ' + name);
    } else {
      addItem(name);
      showStatus('Added: ' + name);
    }
    refresh();
  });
});
