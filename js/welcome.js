// Task 1 - Select elements and handle events: welcome message (index.html)
// Events: submit (button or Enter) and input (while typing).

$(function () {
  const $form = $('#welcome-form');
  const $name = $('#name-input');
  const $message = $('#welcome-message');
  const startText = 'Type your name and press the button.';

  $form.on('submit', function (event) {
    event.preventDefault(); // the page is not reloaded

    // read the value and remove spaces at the start and the end
    const name = $.trim($name.val());

    if (name === '') {
      $name.val('');
      $message.addClass('tool-error').text('Please enter your name first.');
    } else {
      // .text() shows the name as plain text, never as HTML
      $message.removeClass('tool-error').text('Welcome to VintageTape, ' + name + '!');
    }
  });

  // when the field is emptied the message goes back to the start text
  $name.on('input', function () {
    if ($.trim($name.val()) === '') {
      $message.removeClass('tool-error').text(startText);
    }
  });
});
