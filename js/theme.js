// Task 1 - Change appearance with classes (all pages)
// The dark theme is the default. The class "light-theme" on <body> turns on the light theme.
// The chosen theme is saved in the browser, so it stays when the user opens another page.

var themeButton = document.getElementById('theme-button');

// the button text describes the NEXT action
function updateButtonText() {
  if (document.body.classList.contains('light-theme')) {
    themeButton.textContent = 'Switch to dark theme';
  } else {
    themeButton.textContent = 'Switch to light theme';
  }
}

// restore the saved theme when the page opens
try {
  if (localStorage.getItem('vintagetape-theme') === 'light') {
    document.body.classList.add('light-theme');
  }
} catch (error) {
  // the browser does not allow saving: the theme just starts as dark
}
updateButtonText();

themeButton.addEventListener('click', function () {
  document.body.classList.toggle('light-theme');
  updateButtonText();

  // save the choice
  try {
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('vintagetape-theme', 'light');
    } else {
      localStorage.setItem('vintagetape-theme', 'dark');
    }
  } catch (error) {
    // saving is not possible, the theme still works on this page
  }
});
