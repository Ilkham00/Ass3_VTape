// Task 2 - Animated interface elements: FAQ with slide effects (contacts.html)

$(function () {
  // answers are closed at the start
  $('.faq-answer').hide();

  $('.faq-question').on('click', function () {
    const $button = $(this);
    const $answer = $('#' + $button.attr('aria-controls'));
    const isOpen = $button.attr('aria-expanded') === 'true';

    // stop(true, true) finishes the running animation first, so fast clicks do not make a queue
    $answer.stop(true, true).slideToggle(250);

    if (isOpen) {
      $button.attr('aria-expanded', 'false');
    } else {
      $button.attr('aria-expanded', 'true');
    }
  });

  // The questions are <button> elements, so Enter and Space also work from the keyboard.
});
