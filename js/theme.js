// Light / dark mode switch (all pages)
// The dark theme is the default. The class "light-theme" on <body> turns on the light theme.
// The chosen mode is saved in localStorage, so it stays when the user opens another page.

$(function () {
  const $switch = $('#theme-button');
  const $knob = $switch.find('.switch-knob');

  // keeps the switch (state for screen readers and the icon) in line with the page
  function updateSwitch() {
  const isLight = $('body').hasClass('light-theme');
  $switch.attr('aria-checked', isLight ? 'true' : 'false');
  $knob.text(isLight ? '☀' : '☾');
  
  // меняем текст рядом с переключателем
  $switch.find('.switch-label').text(isLight ? 'Dark mode' : 'Light mode');
}

  try {
    if (localStorage.getItem('vintagetape-theme') === 'light') {
      $('body').addClass('light-theme');
    }
  } catch (error) {
    // the browser blocks storage: the dark theme stays
  }
  updateSwitch();

  $switch.on('click', function () {
    $('body').toggleClass('light-theme');
    updateSwitch();

    try {
      localStorage.setItem('vintagetape-theme', $('body').hasClass('light-theme') ? 'light' : 'dark');
    } catch (error) {
      // the mode still works, it is just not remembered
    }
  });
});
