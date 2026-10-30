// Task 3 - Filter website content: search and category together (playlists.html)

$(function () {
  const $input = $('#search-input');
  const $cards = $('#playlists-grid .playlist-card');
  const $buttons = $('.category-button');
  const $count = $('#search-count');
  const $noResults = $('#no-results');
  let category = 'all';

  // one function checks both filters for every card
  function applyFilters() {
    // ignore letter case and spaces at the start and the end
    const text = $.trim($input.val()).toLowerCase();
    let shown = 0;

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
      }
    });

    $count.text('Showing ' + shown + ' of ' + $cards.length + ' genres');
    $noResults.toggleClass('is-hidden', shown !== 0);
  }

  function selectCategory(name) {
    category = name;
    $buttons.removeClass('active').attr('aria-pressed', 'false');
    $buttons.filter('[data-category="' + name + '"]').addClass('active').attr('aria-pressed', 'true');
  }

  $input.on('input', applyFilters);

  $buttons.on('click', function () {
    selectCategory($(this).attr('data-category'));
    applyFilters();
  });

  // clearing both filters shows all cards again
  $('#clear-filters').on('click', function () {
    $input.val('');
    selectCategory('all');
    applyFilters();
    $input.trigger('focus');
  });
});
