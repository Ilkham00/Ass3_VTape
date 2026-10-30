// Task 1 - Select elements and handle events: light / dark theme (all pages)
// The dark theme is the default. The class "light-theme" on <body> turns on the light theme.
// The chosen theme is saved in the browser, so it stays when the user opens another page.

$(function () {
  const $button = $('#theme-button');

  // the button text always names the next action
  function updateButtonText() {
    if ($('body').hasClass('light-theme')) {
      $button.text('Switch to dark theme');
    } else {
      $button.text('Switch to light theme');
    }
  }

  try {
    if (localStorage.getItem('vintagetape-theme') === 'light') {
      $('body').addClass('light-theme');
    }
  } catch (error) {
    // the browser blocks storage: the dark theme stays
  }
  updateButtonText();

  $button.on('click', function () {
    $('body').toggleClass('light-theme');
    updateButtonText();

    try {
      if ($('body').hasClass('light-theme')) {
        localStorage.setItem('vintagetape-theme', 'light');
      } else {
        localStorage.setItem('vintagetape-theme', 'dark');
      }
    } catch (error) {
      // the theme still works, it is just not remembered
    }
  });
});
