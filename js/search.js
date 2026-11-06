// Search and category filter (playlists.html)
// The last search and its results are saved in localStorage and restored on the next visit.

$(function () {
  const $input = $('#search-input');
  const $cards = $('#playlists-grid .playlist-card');
  const $buttons = $('.category-button');
  const $count = $('#search-count');
  const $noResults = $('#no-results');
  const $restored = $('#search-restored');
  const storageKey = 'vintagetape-search';
  let category = 'all';

  // one function checks both filters for every card
  function applyFilters() {
    // ignore letter case and spaces at the start and the end
    const text = $.trim($input.val()).toLowerCase();
    let shown = 0;
    const titles = [];

    $cards.each(function () {
      const $card = $(this);
      const title = $card.find('h2').text().toLowerCase();
      const cardCategories = $card.attr('data-category').split(' ');

      const matchesText = title.indexOf(text) !== -1;
      const matchesCategory = category === 'all' || cardCategories.indexOf(category) !== -1;
      const visible = matchesText && matchesCategory;

      $card.toggleClass('is-hidden', !visible);
      if (visible) {
        shown = shown + 1;
        titles.push($card.find('h2').text());
      }
    });

    $count.text('Showing ' + shown + ' of ' + $cards.length + ' genres');
    $noResults.toggleClass('is-hidden', shown !== 0);

    saveSearch(text, titles);
  }

  // saves the search and its results; an empty search removes the saved copy
  function saveSearch(text, titles) {
    try {
      if (text === '' && category === 'all') {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify({ text: text, category: category, results: titles }));
      }
    } catch (error) {
      // the search still works without saving
    }
  }

  function selectCategory(name) {
    category = name;
    $buttons.removeClass('active').attr('aria-pressed', 'false');
    $buttons.filter('[data-category="' + name + '"]').addClass('active').attr('aria-pressed', 'true');
  }

  // restore the search from the last visit
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && typeof saved.text === 'string' && typeof saved.category === 'string') {
      // an unknown category falls back to All
      const known = $buttons.filter('[data-category="' + saved.category + '"]').length > 0;
      $input.val(saved.text);
      selectCategory(known ? saved.category : 'all');
      $restored.removeClass('is-hidden');
    }
  } catch (error) {
    // nothing saved
  }
  applyFilters();

  $input.on('input', function () {
    $restored.addClass('is-hidden');
    applyFilters();
  });

  $buttons.on('click', function () {
    $restored.addClass('is-hidden');
    selectCategory($(this).attr('data-category'));
    applyFilters();
  });

  // clearing both filters shows all cards again
  $('#clear-filters').on('click', function () {
    $input.val('');
    $restored.addClass('is-hidden');
    selectCategory('all');
    applyFilters();
    $input.trigger('focus');
  });
});
